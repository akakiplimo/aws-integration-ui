// app/(dashboard)/admin/users/new/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserForm } from '@/components/admin/user-form';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Create New User',
  description: 'Add a new user to the system',
};

export default function NewUserPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/users">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Users
          </Link>
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Create New User</h1>
      </div>

      <div className="border rounded-md p-6">
        <UserForm />
      </div>
    </div>
  );
}
