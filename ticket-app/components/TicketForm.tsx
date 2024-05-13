import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { ticketSchema } from '@/ValidationSchemes/ticket';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';

// https://github.com/colinhacks/zod?tab=readme-ov-file#type-inference
// You can extract the TypeScript type of any schema with z.infer<typeof mySchema> .
type TicketFormData = z.infer<typeof ticketSchema>;

const TicketForm = () => {
  // https://react-hook-form.com/docs/useform
  // https://www.npmjs.com/package/@hookform/resolvers#zod
  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  async function onSubmit(values: z.infer<typeof ticketSchema>) {
    console.log(values);
  }

  return (
    <div>
      {/*https://ui.shadcn.com/docs/components/form*/}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={'title'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>ticket title</FormLabel>
                <FormControl>
                  <Input placeholder={'ticket title'} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;
