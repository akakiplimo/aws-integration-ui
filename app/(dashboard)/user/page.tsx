// app/(dashboard)/user/page.tsx
import { Metadata } from 'next';
// import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import { Button } from "@/components/ui/button";
import { Database, Folder, Upload, Clock } from 'lucide-react';
import { BucketsTab } from '@/components/user/bucket-tabs';

export const metadata: Metadata = {
  title: 'User Dashboard',
  description: 'User Dashboard for AWS Integration',
};

export default function UserDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Buckets</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              You have access to 3 buckets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27</div>
            <p className="text-xs text-muted-foreground">
              Across all your buckets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Uploads
            </CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">In the last 7 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>My Buckets</CardTitle>
            <CardDescription>
              Access and manage your assigned buckets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BucketsTab />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent actions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: 'Uploaded report.pdf to bucket-1/reports',
                  time: '2 hours ago',
                },
                {
                  action: 'Downloaded image.jpg from bucket-2/images',
                  time: '5 hours ago',
                },
                { action: 'Created new folder in bucket-3', time: '1 day ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-2 space-y-1">
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
            <CardTitle>Storage Usage</CardTitle>
            <CardDescription>
              Your storage usage across assigned buckets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { bucket: 'bucket-1', usage: '32%', size: '3.2GB / 10GB' },
                { bucket: 'bucket-2', usage: '45%', size: '4.5GB / 10GB' },
                { bucket: 'bucket-3', usage: '15%', size: '1.5GB / 10GB' },
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
