// app/(dashboard)/admin/buckets/[bucketId]/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FoldersList } from '@/components/admin/folders-list';
import { ArrowLeft, FolderPlus } from 'lucide-react';

interface BucketDetailPageProps {
  params: {
    bucketId: string;
  };
}

export const metadata: Metadata = {
  title: 'Bucket Details',
  description: 'View and manage bucket folders',
};

// Mock data - in a real application, you would fetch this from your API
const mockBuckets = [
  {
    id: 'bucket-1',
    name: 'Marketing Assets',
    region: 'us-east-1',
    folders: [
      { id: 'folder-1', name: 'Campaigns', files: 5 },
      { id: 'folder-2', name: 'Branding', files: 8 },
      { id: 'folder-3', name: 'Social Media', files: 12 },
    ],
  },
  {
    id: 'bucket-2',
    name: 'Customer Data',
    region: 'us-west-2',
    folders: [
      { id: 'folder-4', name: 'Reports', files: 7 },
      { id: 'folder-5', name: 'Analytics', files: 4 },
    ],
  },
  {
    id: 'bucket-3',
    name: 'Product Development',
    region: 'eu-west-1',
    folders: [
      { id: 'folder-6', name: 'Designs', files: 15 },
      { id: 'folder-7', name: 'Documentation', files: 9 },
      { id: 'folder-8', name: 'Releases', files: 3 },
    ],
  },
];

export default function BucketDetailPage({ params }: BucketDetailPageProps) {
  const { bucketId } = params;

  // Find the bucket details from mock data
  // In a real app, you would fetch this from your API
  const bucket = mockBuckets.find((b) => b.id === bucketId);

  if (!bucket) {
    return <div>Bucket not found</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/buckets">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Buckets
          </Link>
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{bucket.name}</h1>
        <Button>
          <FolderPlus className="mr-2 h-4 w-4" />
          New Folder
        </Button>
      </div>

      <p className="text-muted-foreground">
        Region: {bucket.region} • {bucket.folders.length} folders
      </p>

      <div className="border rounded-md">
        <FoldersList bucketId={bucketId} folders={bucket.folders} />
      </div>
    </div>
  );
}
