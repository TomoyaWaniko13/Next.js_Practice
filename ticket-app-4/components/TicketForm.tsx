'use client';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { ticketSchema } from '@/ValidationSchema/tickets';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type TicketFormData = z.infer<typeof ticketSchema>;

const TicketForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  //   https://react-hook-form.com/docs/useform
  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  async function onSubmit(values: z.infer<typeof ticketSchema>) {
    try {
      setIsSubmitting(true);
      setError('');
      await axios.post('/api/tickets', values);
      setIsSubmitting(false);
      router.push('/tickets');
      router.refresh();
    } catch (e) {
      console.log(e);
      setError('unknown error occurred.');
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
        <form>
          <FormField
            control={form.control}
            name={'title'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>ticket title</FormLabel>
                <FormControl>
                  <Input placeholder={'ticket title...'} {...field}></Input>
                </FormControl>
              </FormItem>
            )}
          />
          <Controller
            name={'description'}
            control={form.control}
            render={({ field }) => <SimpleMDE placeholder={'description...'} {...field} />}
          />
          <div className={'flex w-full space-x-4 mb-3'}>
            <FormField
              control={form.control}
              name={'status'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={'status...'} />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value={'OPEN'}>open</SelectItem>
                      <SelectItem value={'STARTED'}>started</SelectItem>
                      <SelectItem value={'CLOSED'}>closed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'priority'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={'priority...'} />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value={'LOW'}>low</SelectItem>
                      <SelectItem value={'MEDIUM'}>medium</SelectItem>
                      <SelectItem value={'HIGH'}>high</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button type={'submit'} disabled={isSubmitting}>
            submit
          </Button>
          <p>{error}</p>
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;
