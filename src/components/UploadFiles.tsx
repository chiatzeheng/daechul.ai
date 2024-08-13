// "use client";

// import { UploadButton } from "@/lib/uploadthing";
// import { useToast } from "@/components/ui/use-toast"
// import { ToastAction } from "@/components/ui/toast"

// export function UploadButton() {

//   const { toast } = useToast()


//   return (
//     <main className="flex bg-black flex-col items-center justify-between p-24">
//       <UploadButton
//         className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
//         endpoint="messageAttachment"
//         onClientUploadComplete={(res) => {
//           console.log("Files: ", res);
//           toast({
//             title: "Sucess!.",
//             description: "",
//           })
//         }}
//         onUploadError={(error: Error) => {
//           alert();
//           toast({
//             variant: "destructive",
//             title: "Uh oh! Something went wrong.",
//             description: `${error.message}`,
//             action: <ToastAction altText="Try again">Try again</ToastAction>,
//           })
//         }}
//       />
//     </main>
//   );
// }

// export function Upload () {
