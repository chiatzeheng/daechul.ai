"use client";

import { UploadButton } from "@/lib/uploadthing";

export default function Home() {
  return (
    <main className="flex bg-black flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="messageAttachment"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}