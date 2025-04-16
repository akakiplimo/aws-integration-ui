// components/admin/users-table.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
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
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
  UserPlus,
  Database,
  Shield,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';

// Mock user data
const mockUsers = [
  {
    id: 'user-1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'user',
    buckets: ['Marketing Assets', 'Customer Data'],
    status: 'active',
    createdAt: '2023-09-10',
  },
  {
    id: 'user-2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'user',
    buckets: ['Product Development'],
    status: 'active',
    createdAt: '2023-10-15',
  },
  {
    id: 'user-3',
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    role: 'admin',
    buckets: ['Marketing Assets', 'Customer Data', 'Product Development'],
    status: 'active',
    createdAt: '2023-08-05',
  },
  {
    id: 'user-4',
    name: 'Diana Miller',
    email: 'diana@example.com',
    role: 'user',
    buckets: [],
    status: 'pending',
    createdAt: '2023-11-20',
  },
];

// Mock bucket data for assignment
const mockBuckets = [
  { id: 'bucket-1', name: 'Marketing Assets' },
  { id: 'bucket-2', name: 'Customer Data' },
  { id: 'bucket-3', name: 'Product Development' },
];

export function UsersTable() {
  const router = useRouter();
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedBuckets, setSelectedBuckets] = useState<{
    [key: string]: boolean;
  }>({});

  const handleEditClick = (user: any) => {
    router.push(`/admin/users/edit/${user.id}`);
  };

  const handleDeleteClick = (user: any) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter((user) => user.id !== selectedUser.id));
    setIsDeleteDialogOpen(false);
  };

  const handleAssignBuckets = (user: any) => {
    setSelectedUser(user);

    // Initialize selected buckets based on user's current buckets
    const initialSelectedBuckets = mockBuckets.reduce((acc, bucket) => {
      acc[bucket.id] = user.buckets.includes(bucket.name);
      return acc;
    }, {} as { [key: string]: boolean });

    setSelectedBuckets(initialSelectedBuckets);
    setAssignDialogOpen(true);
  };

  const saveBucketAssignments = () => {
    // In a real app, you would send this data to your API
    console.log('Save bucket assignments for user:', selectedUser.id);
    console.log('Selected buckets:', selectedBuckets);

    // Update the local state for demo purposes
    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        const assignedBuckets = Object.entries(selectedBuckets)
          .filter(([_, isSelected]) => isSelected)
          .map(([bucketId]) => {
            const bucket = mockBuckets.find((b) => b.id === bucketId);
            return bucket ? bucket.name : '';
          })
          .filter((name) => name !== '');

        return { ...user, buckets: assignedBuckets };
      }
      return user;
    });

    setUsers(updatedUsers);
    setAssignDialogOpen(false);
  };

  const toggleRole = (userId: string) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            role: user.role === 'admin' ? 'user' : 'admin',
          };
        }
        return user;
      })
    );
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Assigned Buckets</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {user.role === 'admin' ? (
                    <ShieldAlert className="h-4 w-4 mr-1 text-amber-500" />
                  ) : (
                    <Shield className="h-4 w-4 mr-1 text-muted-foreground" />
                  )}
                  {user.role === 'admin' ? 'Admin' : 'User'}
                </div>
              </TableCell>
              <TableCell>
                {user.buckets.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {user.buckets.map((bucket, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted"
                      >
                        <Database className="h-3 w-3 mr-1" />
                        {bucket}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">
                    None assigned
                  </span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  {user.status === 'active' ? (
                    <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 mr-1 rounded-full bg-amber-500" />
                  )}
                  {user.status === 'active' ? 'Active' : 'Pending'}
                </div>
              </TableCell>
              <TableCell>{user.createdAt}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEditClick(user)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleRole(user.id)}>
                      <Shield className="h-4 w-4 mr-2" />
                      {user.role === 'admin' ? 'Make User' : 'Make Admin'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAssignBuckets(user)}>
                      <Database className="h-4 w-4 mr-2" />
                      Assign Buckets
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteClick(user)}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedUser?.name}? This action
              cannot be undone.
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

      {/* Assign buckets dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Buckets</DialogTitle>
            <DialogDescription>
              Select buckets to assign to {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              {mockBuckets.map((bucket) => (
                <div key={bucket.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={bucket.id}
                    checked={selectedBuckets[bucket.id] || false}
                    onCheckedChange={(checked) => {
                      setSelectedBuckets({
                        ...selectedBuckets,
                        [bucket.id]: checked === true,
                      });
                    }}
                  />
                  <Label htmlFor={bucket.id} className="cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4" />
                      <span>{bucket.name}</span>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAssignDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={saveBucketAssignments}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
