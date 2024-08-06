import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerAuthSession as getAuthSession } from "@/server/auth";

const f = createUploadthing();
// FileRouter for your app, can contain multiple FileRoutes

const auth = async() => {
  const session = await getAuthSession();
  if (!session) {
    throw new UploadThingError("You need to be logged in to upload files");
  }
  return { userId: session.user.id };
}

export const ourFileRouter = {
  asprofilePicture: f(["image"])
  .middleware(() => {return auth();})
  .onUploadComplete((data) => console.log("file", data)),

// This route takes an attached image OR video
messageAttachment: f(["image", "video"])
.middleware(() => {return auth();})
.onUploadComplete((data) => console.log("file", data)),

// Takes exactly ONE image up to 2MB
strictImageAttachment: f({
  image: { maxFileSize: "2MB", maxFileCount: 1, minFileCount: 1 },
})
.middleware(() => {return auth();})
.onUploadComplete((data) => console.log("file", data)),

// Takes up to 4 2mb images and/or 1 256mb video
mediaPost: f({
  image: { maxFileSize: "2MB", maxFileCount: 4 },
  video: { maxFileSize: "256MB", maxFileCount: 1 },
})
.middleware(() => {return auth();})
.onUploadComplete((data) => console.log("file", data)),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
