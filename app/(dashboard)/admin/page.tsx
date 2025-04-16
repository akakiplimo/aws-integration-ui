// app/(dashboard)/admin/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Database, Folder, Upload, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard for AWS Integration',
};

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
            <Button asChild className="mt-4 w-full" variant="outline">
              <Link href="/admin/users">Manage Users</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Buckets</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+1 since last month</p>
            <Button asChild className="mt-4 w-full" variant="outline">
              <Link href="/admin/buckets">Manage Buckets</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Folders</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
            <p className="text-xs text-muted-foreground">+4 since last month</p>
            <Button asChild className="mt-4 w-full" variant="outline">
              <Link href="/admin/buckets">View All Buckets</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent User Activity</CardTitle>
            <CardDescription>
              Recent actions performed by users in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  user: 'alice@example.com',
                  action: 'Uploaded file to bucket-1/reports',
                  time: '2 hours ago',
                },
                {
                  user: 'bob@example.com',
                  action: 'Accessed bucket-2/images',
                  time: '5 hours ago',
                },
                {
                  user: 'charlie@example.com',
                  action: 'Created new folder in bucket-3',
                  time: '1 day ago',
                },
                {
                  user: 'diana@example.com',
                  action: 'Downloaded file from bucket-1/analytics',
                  time: '1 day ago',
                },
                {
                  user: 'emily@example.com',
                  action: 'Updated permissions for bucket-2',
                  time: '2 days ago',
                },
              ].map((activity, i) => (
                <div key={i} className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.user}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Storage Overview</CardTitle>
            <CardDescription>
              Current storage usage across all buckets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { bucket: 'bucket-1', usage: '45%', size: '4.5GB / 10GB' },
                { bucket: 'bucket-2', usage: '72%', size: '7.2GB / 10GB' },
                { bucket: 'bucket-3', usage: '23%', size: '2.3GB / 10GB' },
                { bucket: 'bucket-4', usage: '8%', size: '0.8GB / 10GB' },
                { bucket: 'bucket-5', usage: '51%', size: '5.1GB / 10GB' },
              ].map((bucket, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">
                      {bucket.bucket}
                    </p>
                    <p className="text-sm font-medium">{bucket.usage}</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: bucket.usage }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{bucket.size}</p>
                </div>
              ))}
            </div>
            <Button asChild className="mt-4 w-full" variant="outline">
              <Link href="/admin/buckets">View All Buckets</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
            <CardDescription>
              Files recently uploaded to the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  file: 'quarterly_report.pdf',
                  bucket: 'bucket-1/reports',
                  user: 'alice@example.com',
                  time: '2 hours ago',
                },
                {
                  file: 'banner_image.png',
                  bucket: 'bucket-2/marketing',
                  user: 'bob@example.com',
                  time: '4 hours ago',
                },
                {
                  file: 'product_spec.docx',
                  bucket: 'bucket-3/development',
                  user: 'charlie@example.com',
                  time: '1 day ago',
                },
                {
                  file: 'user_data.csv',
                  bucket: 'bucket-1/analytics',
                  user: 'diana@example.com',
                  time: '1 day ago',
                },
              ].map((upload, i) => (
                <div key={i} className="flex items-center">
                  <Upload className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
                    <div className="flex items-center">
                      <p className="text-sm font-medium leading-none">
                        {upload.file}
                      </p>
                      <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                        {upload.file.split('.').pop()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      to {upload.bucket}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{upload.user}</span>
                      <span className="mx-1">•</span>
                      <span>{upload.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current status of integrated AWS services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  service: 'S3 Buckets',
                  status: 'Operational',
                  latency: '23ms',
                  uptime: '99.99%',
                },
                {
                  service: 'API Gateway',
                  status: 'Operational',
                  latency: '45ms',
                  uptime: '99.97%',
                },
                {
                  service: 'Lambda Functions',
                  status: 'Operational',
                  latency: '78ms',
                  uptime: '99.95%',
                },
                {
                  service: 'Cognito Authentication',
                  status: 'Operational',
                  latency: '112ms',
                  uptime: '99.99%',
                },
                {
                  service: 'CloudWatch Logging',
                  status: 'Operational',
                  latency: '35ms',
                  uptime: '100%',
                },
              ].map((service, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                    <p className="text-sm font-medium">{service.service}</p>
                  </div>
                  <div className="flex space-x-4">
                    <div className="text-sm text-muted-foreground">
                      {service.latency}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {service.uptime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full" variant="outline">
              View System Logs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
