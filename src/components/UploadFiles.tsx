"use client";

import { UploadButton } from "@/lib/uploadthing";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function Home() {

  const { toast } = useToast()


  return (
    <main className="flex bg-black flex-col items-center justify-between p-24">
      <UploadButton
        // endpoint="messageAttachment"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          toast({
            title: "Sucess!.",
            description: "",
          })
        }}
        onUploadError={(error: Error) => {
          alert();
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: `${error.message}`,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        }}
      />
    </main>
  );
}