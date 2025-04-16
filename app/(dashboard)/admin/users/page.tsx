// app/(dashboard)/admin/users/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search, Download, Database, Users, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { UsersTable } from '@/components/admin/users-table';

export const metadata: Metadata = {
  title: 'User Management',
  description: 'Manage users and their access to S3 buckets',
};

export default function AdminUsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <Button asChild>
          <Link href="/admin/users/new">
            <Plus className="mr-2 h-4 w-4" />
            New User
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Users Overview</CardTitle>
            <CardDescription>
              Manage user accounts and their permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted rounded-lg p-3 flex flex-col items-center justify-center">
                <h3 className="text-2xl font-bold">12</h3>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>

              <div className="bg-muted rounded-lg p-3 flex flex-col items-center justify-center">
                <h3 className="text-2xl font-bold">3</h3>
                <p className="text-sm text-muted-foreground">Admin Users</p>
              </div>

              <div className="bg-muted rounded-lg p-3 flex flex-col items-center justify-center">
                <h3 className="text-2xl font-bold">9</h3>
                <p className="text-sm text-muted-foreground">Regular Users</p>
              </div>

              <div className="bg-muted rounded-lg p-3 flex flex-col items-center justify-center">
                <h3 className="text-2xl font-bold">1</h3>
                <p className="text-sm text-muted-foreground">Pending Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>User Accounts</CardTitle>
                <CardDescription>
                  Manage user access and permissions
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-8 w-[200px] md:w-[300px]"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <UsersTable />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Account Activity</CardTitle>
            <CardDescription>
              Recent user account changes and access events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    user: 'Admin',
                    action: 'Created user account for bob@example.com',
                    date: '2023-11-20',
                  },
                  {
                    user: 'Admin',
                    action: 'Modified permissions for alice@example.com',
                    date: '2023-11-18',
                  },
                  {
                    user: 'System',
                    action: 'User charlie@example.com signed in',
                    date: '2023-11-17',
                  },
                  {
                    user: 'Admin',
                    action: 'Granted bucket access to diana@example.com',
                    date: '2023-11-15',
                  },
                  {
                    user: 'System',
                    action: 'User account verified for emily@example.com',
                    date: '2023-11-12',
                  },
                ].map((activity, i) => (
                  <TableRow key={i}>
                    <TableCell>{activity.user}</TableCell>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>{activity.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bucket Access Distribution</CardTitle>
            <CardDescription>Number of users per bucket</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { bucket: 'Marketing Assets', users: 5 },
                { bucket: 'Customer Data', users: 7 },
                { bucket: 'Product Development', users: 4 },
                { bucket: 'Financial Records', users: 2 },
                { bucket: 'HR Documents', users: 3 },
              ].map((bucket, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Database className="h-4 w-4 mr-2" />
                      <p className="text-sm font-medium">{bucket.bucket}</p>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <p className="text-sm">{bucket.users}</p>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${(bucket.users / 12) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
