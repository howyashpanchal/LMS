"use client";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "image is required",
  }),
});

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}
export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData?.imageUrl || "",
    },
  });

  // const { isSubmitting, setIsSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      formSchema.parse(values);
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course Updated Successfully");
      toggleEdit();
      router.refresh();
    } catch {
      setError("Something went wrong");
      toast.error("Something went wrong");
    }
  };

  console.log("Initial Data:", initialData);

  return (
    <>
      <div className=" mt-6 bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          Course Image
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing && <>Cancel</>}
            {!isEditing && !initialData.imageUrl && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add an image
              </>
            )}
            {!isEditing && initialData.imageUrl && (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Image
              </>
            )}
          </Button>
        </div>
        {!isEditing &&
          (!initialData.imageUrl ? (
            <div className="flex items-center justify-center h-60">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          ) : (
            <div className="relative aspect-video mt-2">
              <Image
                alt="Upload"
                fill
                className="object-cover rounded-md"
                src={initialData.imageUrl}
              />
            </div>
          ))}

        {isEditing && (
          <div>
            <FileUpload
              endpoint="imageUploader"
              onChange={(url) => {
                if (url) {
                  try {
                    onSubmit({ imageUrl: url });
                  } catch {
                    toast.error("Failed to upload image");
                  }
                }
              }}
            />
            <div className="text-xs text-muted-foreground mt-4">
              16:9 aspect ratio recommended
            </div>
          </div>
        )}
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </>
  );
};
