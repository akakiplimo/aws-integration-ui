// types/auth.ts
export type Role = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  image?: string | null;
  buckets: string[];
}

export interface Session {
  user: User;
  expires: string;
}

export interface AuthResult {
  success: boolean;
  message?: string;
  user?: User;
}

// types/user.ts
export interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  buckets: string[];
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
}

// types/bucket.ts
export interface Bucket {
  id: string;
  name: string;
  region: string;
  folders: number;
  files: number;
  size: string;
  created: string;
  users: string[];
}

export interface Folder {
  id: string;
  name: string;
  files: number;
}

// types/folder.ts
export interface File {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: string;
  uploadedBy: string;
}
