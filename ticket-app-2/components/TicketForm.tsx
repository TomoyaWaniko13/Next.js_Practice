import { z } from 'zod';
import { ticketSchema } from '@/ValidationSchemas/ticket';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';

// You can extract the TypeScript type of any schema with z.infer<typeof mySchema> .
type TicketFormData = z.infer<typeof ticketSchema>;

const TicketForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // https://react-hook-form.com/docs/useform
  // https://github.com/react-hook-form/resolvers
  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  // You can extract the TypeScript type of any schema with z.infer<typeof mySchema> .
  const onSubmit = async (values: z.infer<typeof ticketSchema>) => {
    try {
      setIsSubmitting(true);
      setError(''); // no error

      // send a POST request to the server.
      // '/api/tickets' is the endpoint to which the request is sent.
      //  values is the data that is sent as the body of the request.
      await axios.post('/api/tickets', values);
    } catch (e) {
      setError('unknown error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={'rounded-md border w-full p-4'}>
      {/*https://ui.shadcn.com/docs/components/form*/}
      <Form {...form}>
        {/*https://react-hook-form.com/docs/useform/handlesubmit*/}
        {/*form.handleSubmit = Ready to send to the server*/}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/*https://react-hook-form.com/docs/useform/control*/}
          {/*form.control = Take control of the form*/}
          <FormField
            control={form.control}
            name={'title'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket title</FormLabel>
                <FormControl>
                  {/*https://ui.shadcn.com/docs/components/input*/}
                  <Input placeholder={'ticket title'} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {/*https://react-hook-form.com/docs/usecontroller/controller*/}
          {/*Controller = Wrapper component for controlled inputs*/}
          <Controller
            name={'description'}
            control={form.control}
            render={({ field }) => <SimpleMDE placeholder={'description'} {...field} />}
          />
          <div className={'flex w-full space-x-4 mb-4'}>
            <FormField
              control={form.control}
              name={'status'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>status</FormLabel>
                  {/*https://ui.shadcn.com/docs/components/select*/}
                  {/*Displays a list of options for the user to pick from—triggered by a button.*/}
                  {/*The onValueChange prop is assigned to field.onChange. This is a function that gets
                  called whenever the value of the select field changes. The field.onChange function is
                  provided by the react-hook-form library and is used to update the form state whenever the
                  field's value changes.*/}
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={'status'} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='OPEN'>Open</SelectItem>
                      <SelectItem value='STARTED'>Started</SelectItem>
                      <SelectItem value='CLOSED'>Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {/*https://react-hook-form.com/docs/useform/control*/}
            {/*form.control = Take control of the form*/}
            <FormField
              control={form.control}
              name={'priority'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>priority</FormLabel>
                  {/*https://www.react-hook-form.com/api/usecontroller/controller/*/}
                  {/*onChange = A function which sends the input's value to the library.*/}
                  {/*value = The current value of the controlled component*/}
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={'priority'} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='LOW'>Low</SelectItem>
                      <SelectItem value='MEDIUM'>Medium</SelectItem>
                      <SelectItem value='HIGH'>High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            ></FormField>
          </div>
          <Button type={'submit'}>Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;
