'use client';

import { ticketSchema } from '@/ValidationSchema/ticket';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ticket } from '@prisma/client';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

type TicketFormData = z.infer<typeof ticketSchema>;

interface Props {
  ticket?: Ticket;
}

const TicketForm = ({ ticket }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  const onSubmit = async (values: z.infer<typeof ticketSchema>) => {
    try {
      setIsSubmitting(true);
      setError('');

      if (ticket) {
        await axios.patch('/api/tickets/' + ticket.id, values);
      } else {
        await axios.post('/api/tickets', values);
      }
      setIsSubmitting(false);
      router.push('/tickets');
      router.refresh();
    } catch (error) {
      console.log(error);
      setError('unknown error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={'rounded-md border w-full p-4'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={'mb-4'}>
            <FormField
              control={form.control}
              name={'title'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket TItle</FormLabel>
                  <FormControl>
                    <Input placeholder={'Ticket Title...'} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Controller
            name={'description'}
            control={form.control}
            render={({ field }) => <SimpleMDE placeholder={'Description'} {...field} />}
          />
          <div className={'flex w-full space-x-4 mb-4'}>
            <FormField
              control={form.control}
              name={'status'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={'status...'} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={'OPEN'}>Open</SelectItem>
                      <SelectItem value={'STARTED'}>Started</SelectItem>
                      <SelectItem value={'CLOSED'}>Closed</SelectItem>
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
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={'priority...'} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={'LOW'}>Low</SelectItem>
                      <SelectItem value={'MEDIUM'}>Medium</SelectItem>
                      <SelectItem value={'HIGH'}>High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button type={'submit'} disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;