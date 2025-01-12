import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(
    req : Request,
    { params } : { params : { chapterId : string , courseId : string } }
){
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthroized", {status:401})
        }

        const ownCourse = await db.course.findUnique({
            where : {
                id : params.courseId,
                userId
            }
        })

        if (ownCourse) {
            return new NextResponse("Unauthorized", {status : 401})
        }

        const unPublishChapter = await db.chapter.update({
            where :{
                id : params.chapterId,
                courseId : params.courseId
            },
            data :{
                isPublished : false
            }
        });

        const publishedChapterInCourse = await db.chapter.findMany({
            where : {
                courseId : params.courseId,
                isPublished : true,
            }
        })

        if (!publishedChapterInCourse) {
            await db.chapter.update({
                where :{
                    id : params.courseId
                },
                data : {
                    isPublished :false
                }
            })
        }

        return NextResponse.json(unPublishChapter)

        
    } catch (error) {
        console.log("[CHAPTER_UNPUBLISH]", error)
        return new NextResponse("Internal Server Error", {status:500})
    }
}