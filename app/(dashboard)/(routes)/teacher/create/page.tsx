"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const CourseCreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`/api/course`, values);
      router.push(`/teacher/courses/${response.data.id}`);
    } catch {
      console.log("something went wrong");
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
        <div>
          <h1 className="text-2xl">Name your course</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            repellendus molestiae quidem porro modi? Recusandae, ab atque.
            Neque, aperiam voluptate.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g, `Advance Web Developement`"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What you are trying to teach in this course?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Link href="/">
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                  <Button type="button" disabled={!isValid || isSubmitting}>
                    Continue
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};
export default CourseCreatePage;
