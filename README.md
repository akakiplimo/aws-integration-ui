# AWS Integration UI

A Next.js application for managing AWS S3 buckets, folders, and user permissions with role-based access control.

## Features

- **Authentication**: Login system with role-based access (Admin and User)
- **Admin Dashboard**:
  - User management (create, edit, delete users)
  - Bucket management (create, view, delete buckets)
  - Folder management (create, rename, delete folders)
  - Assign buckets to users
- **User Dashboard**:
  - View assigned buckets and folders
  - Upload files to specific folders
  - Track recent activities

## Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: React hooks and context
- **Form Handling**: React Hook Form with Zod validation

## Prerequisites

- Node.js 18+ and npm/yarn
- Git

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd aws-integration-ui
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
aws-integration-ui/
├── app/                    # Next.js app router
│   ├── api/                # API routes
│   ├── (auth)/             # Auth pages (login, forgot password)
│   └── (dashboard)/        # Dashboard pages for admin and user
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── auth/               # Authentication components
│   ├── layout/             # Layout components
│   ├── admin/              # Admin-specific components
│   └── user/               # User-specific components
├── lib/                    # Utility functions and hooks
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

## AWS Integration

This UI is designed to integrate with AWS services:

- **Authentication**: Amazon Cognito (placeholder for now)
- **Storage**: Amazon S3 buckets and folders
- **API**: AWS API Gateway and Lambda functions

To connect with AWS, you'll need to:

1. Set up the AWS services (S3, API Gateway, Lambda)
2. Configure authentication with Amazon Cognito or another auth provider
3. Replace the mock data with actual API calls to AWS services

## Test Accounts

For development purposes, the app includes two mock users:

- **Admin User**:

  - Email: admin@example.com
  - Password: password

- **Regular User**:
  - Email: user@example.com
  - Password: password

## Deployment

1. Build the application:

   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy to your hosting platform of choice (Vercel, AWS Amplify, etc.)

## Next Steps

- Implement actual AWS integration using AWS SDK for JavaScript
- Set up proper authentication with Amazon Cognito
- Implement file upload functionality with S3 pre-signed URLs
- Add comprehensive error handling and logging

## License

[MIT](LICENSE)
