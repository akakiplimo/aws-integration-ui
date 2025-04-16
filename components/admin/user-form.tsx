/* eslint-disable @typescript-eslint/no-explicit-any */
// components/admin/user-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Database, Shield } from 'lucide-react';

// Mock bucket data for assignment
const mockBuckets = [
  { id: 'bucket-1', name: 'Marketing Assets' },
  { id: 'bucket-2', name: 'Customer Data' },
  { id: 'bucket-3', name: 'Product Development' },
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  isAdmin: z.boolean(),
  buckets: z.array(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

export function UserForm({ user }: { user?: any }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: user
      ? {
          name: user.name,
          email: user.email,
          password: '',
          isAdmin: user.role === 'admin',
          buckets: user.buckets.map((name: string) => {
            const bucket = mockBuckets.find((b) => b.name === name);
            return bucket ? bucket.id : '';
          }),
        }
      : {
          name: '',
          email: '',
          password: '',
          isAdmin: false,
          buckets: [],
        },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);

    try {
      // Here you would implement the actual user creation/update logic
      console.log('Form submitted:', values);

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect back to users list
      router.push('/admin/users');
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@example.com"
                    type="email"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{user ? 'New Password' : 'Password'}</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    user
                      ? 'Leave blank to keep current password'
                      : 'Create a secure password'
                  }
                  type="password"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              {user && (
                <FormDescription>
                  Leave this field blank if you don&apos;t want to change the
                  password.
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isAdmin"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin Privileges
                </FormLabel>
                <FormDescription>
                  Admins can manage users, buckets, and have full system access.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div>
          <h3 className="text-lg font-medium mb-4">Bucket Access</h3>
          <div className="space-y-2 border rounded-md p-4">
            <FormField
              control={form.control}
              name="buckets"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockBuckets.map((bucket) => (
                      <FormField
                        key={bucket.id}
                        control={form.control}
                        name="buckets"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={bucket.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(bucket.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          bucket.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== bucket.id
                                          )
                                        );
                                  }}
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormLabel className="cursor-pointer flex items-center">
                                <Database className="h-4 w-4 mr-2" />
                                {bucket.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/users')}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : user ? 'Update User' : 'Create User'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
