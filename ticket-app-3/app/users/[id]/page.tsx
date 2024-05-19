import prisma from '@/prisma/db';
import UserForm from '@/components/UserForm';

interface Props {
  params: { id: string };
}

const EditUserPage = async ({ params }: Props) => {
  //   Use select to return specific fields
  const user = await prisma?.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return <p className={'text-destructive'}>user not found</p>;
  }

  user.password = '';
  return <UserForm user={user} />;
};

export default EditUserPage;
