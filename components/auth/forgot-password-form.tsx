'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { Toaster } from 'sonner';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      // Here you would implement the actual password reset logic
      console.log('Password reset requested for:', values.email);

      // Mock password reset request - in a real app, you'd call an API
      setTimeout(() => {
        setEmailSent(true);
        toast('Reset email sent', {
          description: 'Check your inbox for the password reset link',
        });
      }, 1000);
    } catch (error) {
      console.error('Password reset request failed:', error);
      toast.error('Something went wrong', {
        description: 'Failed to send reset email. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      {!emailSent ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send reset link'}
            </Button>
          </form>
        </Form>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-center text-sm">
            Reset link sent! Check your email inbox for instructions to reset
            your password.
          </p>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              form.reset();
              setEmailSent(false);
            }}
          >
            Send again
          </Button>
        </div>
      )}
      <Toaster richColors />
    </div>
  );
}
