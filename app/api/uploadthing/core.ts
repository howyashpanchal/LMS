import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// const handleAuth = async () => {
//     const {userId} = await auth();
//     if (!userId) throw new Error("Unauthorized");
//     return {userId}
// }

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // courseImage : f({image: {maxFileSize : "4MB" , maxFileCount : 1}})
    // .middleware(async() => await handleAuth())
    // .onUploadComplete(async ({ metadata }) => {
    //     console.log("Upload complete for userId:", metadata.userId);
    // }),

    // courseAttachment: f({
    //     text: { maxFileSize: "4MB", maxFileCount: 1 },
    //     image: { maxFileSize: "4MB", maxFileCount: 1 },
    //     pdf: { maxFileSize: "4MB", maxFileCount: 1 },
    //     video: { maxFileSize: "16MB", maxFileCount: 1 },
    //     audio: { maxFileSize: "8MB", maxFileCount: 1 },
    // })
    // .middleware(async () => await handleAuth())
    // .onUploadComplete(async ({ metadata }) => {
    //     console.log("Upload complete for userId:", metadata.userId);
    // }),

    // chapterVideo : f({video : {maxFileSize : "512GB" , maxFileCount : 1}})
    // .middleware(() => handleAuth())
    // .onUploadComplete(async ({ metadata }) => {
    //     console.log("Upload complete for userId:", metadata.userId);
    // }),
    imageUploader : f({
        image:{
            maxFileSize : "4MB",
            maxFileCount : 1
        },
    })
    .middleware(async () => {
        const {userId} = await auth();
        if (!userId) throw new UploadThingError("Unauthorized");
        return {userId};
    })
    .onUploadComplete(async ({ metadata }) => {
        console.log("Uploaded by user ID:", metadata.userId);
        
        return { uploadedBy: metadata.userId };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
