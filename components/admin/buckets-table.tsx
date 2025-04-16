// components/admin/buckets-table.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  MoreHorizontal,
  Pencil,
  Trash,
  FolderPlus,
  Upload,
  Users,
  Database,
  Folder,
  Plus,
} from 'lucide-react';

// Mock bucket data
const mockBuckets = [
  {
    id: 'bucket-1',
    name: 'Marketing Assets',
    region: 'us-east-1',
    folders: 3,
    files: 25,
    size: '4.5 GB',
    created: '2023-09-10',
    users: ['alice@example.com', 'charlie@example.com'],
  },
  {
    id: 'bucket-2',
    name: 'Customer Data',
    region: 'us-west-2',
    folders: 2,
    files: 11,
    size: '7.2 GB',
    created: '2023-10-15',
    users: ['alice@example.com', 'bob@example.com', 'charlie@example.com'],
  },
  {
    id: 'bucket-3',
    name: 'Product Development',
    region: 'eu-west-1',
    folders: 3,
    files: 27,
    size: '2.3 GB',
    created: '2023-08-05',
    users: ['bob@example.com', 'charlie@example.com'],
  },
];

export function BucketsTable() {
  const router = useRouter();
  const [buckets, setBuckets] = useState(mockBuckets);
  const [selectedBucket, setSelectedBucket] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const handleViewBucket = (bucket: any) => {
    router.push(`/admin/buckets/${bucket.id}`);
  };

  const handleDeleteClick = (bucket: any) => {
    setSelectedBucket(bucket);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setBuckets(buckets.filter((bucket) => bucket.id !== selectedBucket.id));
    setIsDeleteDialogOpen(false);
  };

  const handleNewFolder = (bucket: any) => {
    setSelectedBucket(bucket);
    setNewFolderName('');
    setNewFolderDialogOpen(true);
  };

  const createNewFolder = () => {
    if (newFolderName.trim()) {
      // In a real app, you would call your API to create the folder
      console.log(
        `Creating folder ${newFolderName} in bucket ${selectedBucket.id}`
      );

      // Update local state for demo purposes
      const updatedBuckets = buckets.map((bucket) => {
        if (bucket.id === selectedBucket.id) {
          return {
            ...bucket,
            folders: bucket.folders + 1,
          };
        }
        return bucket;
      });

      setBuckets(updatedBuckets);
      setNewFolderDialogOpen(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {buckets.map((bucket) => (
          <Card key={bucket.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  {bucket.name}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleViewBucket(bucket)}>
                      <Folder className="h-4 w-4 mr-2" />
                      View Folders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNewFolder(bucket)}>
                      <FolderPlus className="h-4 w-4 mr-2" />
                      New Folder
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteClick(bucket)}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardTitle>
              <CardDescription>Region: {bucket.region}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Folders</span>
                  <span className="text-lg font-medium">{bucket.folders}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Files</span>
                  <span className="text-lg font-medium">{bucket.files}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Size</span>
                  <span className="text-lg font-medium">{bucket.size}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="text-lg font-medium">{bucket.created}</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Assigned Users:</h4>
                <div className="flex flex-wrap gap-1">
                  {bucket.users.map((user, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted"
                    >
                      <Users className="h-3 w-3 mr-1" />
                      {user.split('@')[0]}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNewFolder(bucket)}
              >
                <FolderPlus className="h-4 w-4 mr-1" />
                New Folder
              </Button>
              <Button size="sm" onClick={() => handleViewBucket(bucket)}>
                <Folder className="h-4 w-4 mr-1" />
                View Folders
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedBucket?.name}? This
              action cannot be undone and all contained files will be
              permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New folder dialog */}
      <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Folder</DialogTitle>
            <DialogDescription>
              Create a new folder in {selectedBucket?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="folderName" className="text-sm font-medium">
                  Folder Name
                </label>
                <Input
                  id="folderName"
                  placeholder="Enter folder name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setNewFolderDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={createNewFolder} disabled={!newFolderName.trim()}>
              Create Folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
