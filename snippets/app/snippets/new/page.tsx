import { db } from '@/db';
import { redirect } from 'next/navigation';

// server actions are the functions that will be called with the values
// users enter into the form
export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    // This needs to be a server action!
    'use server';
    // Check the users' input and make sure it's valid
    const title = formData.get('title');
    const code = formData.get('code');

    // Create a new record in the database
    const snippet = await db.snippet.create({
      data: {
        title: title as string,
        code: code as string,
      },
    });
    console.log(snippet);
    // Redirect the user back to the root route
    redirect('/');
  }

  return (
    <form action={createSnippet}>
      <h3 className='font-bold m-3'>Create a Snippet</h3>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <label className='w-12' htmlFor='title'>
            Title
          </label>
          <input name='title' className='border rounded p-2 w-full' id='title' />
        </div>

        <div className='flex gap-4'>
          <label className='w-12' htmlFor='code'>
            Code
          </label>
          <textarea name='code' className='border rounded p-2 w-full' id='code' />
        </div>

        <button type='submit' className='rounded p-2 bg-blue-200'>
          Create
        </button>
      </div>
    </form>
  );
}
