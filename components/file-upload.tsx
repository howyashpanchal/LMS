"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  onUploadError?: (error: Error) => void;
}

export const FileUpload = ({
  onChange,
  endpoint,
  onUploadError,
}: FileUploadProps) => {
  return (
    <>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
          toast.success("File uploaded successfully");
          console.log("File uploaded successfully:", res);
        }}
        onUploadError={(error: Error) => {
          onUploadError?.(error);
          toast.error(`${error?.message}`);
        }}
      />
    </>
  );
};
