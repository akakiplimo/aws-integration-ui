/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/admin/folders-list.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { MoreHorizontal, Pencil, Trash, Upload, Folder } from 'lucide-react';

interface FolderProps {
  id: string;
  name: string;
  files: number;
}

interface FoldersListProps {
  bucketId: string;
  folders: FolderProps[];
}

export function FoldersList({ folders: initialFolders }: FoldersListProps) {
  const [folders, setFolders] = useState(initialFolders);
  const [selectedFolder, setSelectedFolder] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const handleDeleteClick = (folder: any) => {
    setSelectedFolder(folder);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setFolders(folders.filter((folder) => folder.id !== selectedFolder.id));
    setIsDeleteDialogOpen(false);
  };

  const handleRenameClick = (folder: any) => {
    setSelectedFolder(folder);
    setNewFolderName(folder.name);
    setIsRenameDialogOpen(true);
  };

  const confirmRename = () => {
    if (newFolderName.trim()) {
      setFolders(
        folders.map((folder) =>
          folder.id === selectedFolder.id
            ? { ...folder, name: newFolderName }
            : folder
        )
      );
      setIsRenameDialogOpen(false);
    }
  };

  const handleUploadClick = (folder: any) => {
    setSelectedFolder(folder);
    setIsUploadDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      simulateUpload(file);
    }
  };

  const simulateUpload = (file?: File) => {
    setUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Update file count for the selected folder
            setFolders(
              folders.map((folder) =>
                folder.id === selectedFolder.id
                  ? { ...folder, files: folder.files + 1 }
                  : folder
              )
            );
            setUploading(false);
            setUploadProgress(0);
            setIsUploadDialogOpen(false);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Folder Name</TableHead>
            <TableHead>Files</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {folders.map((folder) => (
            <TableRow key={folder.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <Folder className="h-4 w-4" />
                  <span>{folder.name}</span>
                </div>
              </TableCell>
              <TableCell>{folder.files} files</TableCell>
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
                    <DropdownMenuItem onClick={() => handleUploadClick(folder)}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Files
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRenameClick(folder)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteClick(folder)}
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
              Are you sure you want to delete the folder &quot;
              {selectedFolder?.name}
              &quot;? This action cannot be undone and all contained files will
              be permanently deleted.
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

      {/* Rename dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Folder</DialogTitle>
            <DialogDescription>
              Enter a new name for the folder
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
              onClick={() => setIsRenameDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmRename} disabled={!newFolderName.trim()}>
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
            <DialogDescription>
              Select a file to upload to folder &quot;{selectedFolder?.name}
              &quot;
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                disabled={uploading}
              />
              {uploading && (
                <div className="space-y-2">
                  <div className="text-sm text-center">
                    Uploading... {uploadProgress}%
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUploadDialogOpen(false)}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button disabled={uploading}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
