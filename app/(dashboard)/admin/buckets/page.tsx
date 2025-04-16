// app/(dashboard)/admin/buckets/page.tsx
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { BucketsTable } from '@/components/admin/buckets-table';

export const metadata: Metadata = {
  title: 'Bucket Management',
  description: 'Manage S3 buckets and folders',
};

export default function AdminBucketsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Bucket Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Bucket
        </Button>
      </div>

      <BucketsTable />
    </div>
  );
}
