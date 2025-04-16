// components/user/buckets-tabs.tsx
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FoldersView } from '@/components/user/folders-view';

// Mock data for the buckets and folders
const mockBuckets = [
  {
    id: 'bucket-1',
    name: 'Marketing Assets',
    folders: [
      { id: 'folder-1', name: 'Campaigns', files: 5 },
      { id: 'folder-2', name: 'Branding', files: 8 },
      { id: 'folder-3', name: 'Social Media', files: 12 },
    ],
  },
  {
    id: 'bucket-2',
    name: 'Customer Data',
    folders: [
      { id: 'folder-4', name: 'Reports', files: 7 },
      { id: 'folder-5', name: 'Analytics', files: 4 },
    ],
  },
  {
    id: 'bucket-3',
    name: 'Product Development',
    folders: [
      { id: 'folder-6', name: 'Designs', files: 15 },
      { id: 'folder-7', name: 'Documentation', files: 9 },
      { id: 'folder-8', name: 'Releases', files: 3 },
    ],
  },
];

export function BucketsTab() {
  const [selectedBucket, setSelectedBucket] = useState(mockBuckets[0].id);

  return (
    <Tabs
      defaultValue={selectedBucket}
      onValueChange={setSelectedBucket}
      className="w-full"
    >
      <TabsList className="grid grid-cols-3 mb-4">
        {mockBuckets.map((bucket) => (
          <TabsTrigger key={bucket.id} value={bucket.id}>
            {bucket.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {mockBuckets.map((bucket) => (
        <TabsContent key={bucket.id} value={bucket.id}>
          <FoldersView
            bucketId={bucket.id}
            bucketName={bucket.name}
            folders={bucket.folders}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
