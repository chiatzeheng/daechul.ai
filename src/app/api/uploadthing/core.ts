import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerAuthSession as getAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

const f = createUploadthing();
// FileRouter for your app, can contain multiple FileRoutes

const auth = async() => {
  const session = await getAuthSession();
  if (!session) {
    throw new UploadThingError("You need to be logged in to upload files");
  }
  return { userId: session.user.id };
}

export const ourFileRouter = {// Takes exactly ONE image up to 2MB
strictImageAttachment: f({
  image: { maxFileSize: "2MB", maxFileCount: 1, minFileCount: 1 },
})
.middleware(() => {return auth();})
.onUploadComplete((data) => console.log("file", data)),
pdfAttachment: f({
  pdf: { maxFileSize: "2MB", minFileCount: 1, maxFileCount: 10 },
}).middleware(() => {return auth();})
.onUploadComplete(async (data) => {
  
 try {
  await api.loan.postDocument({
     name: data.file.name,
     url: data.file.url,
     key: data.file.key,
   })
 } catch (error) {
    console.log(error);
 }})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
