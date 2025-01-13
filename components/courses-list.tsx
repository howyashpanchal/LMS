import { Category, Course } from "@prisma/client";
import { CourseCard } from "@/components/course-card";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapter: { id: string }[];
  progress: number | null;
};
interface CourseListPageProps {
  items: CourseWithProgressWithCategory[];
}
export const CoursesList = ({ items }: CourseListPageProps) => {
  return (
    <>
      <div>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          <CourseCard
            key={items.id}
            id={items.id}
            title={items.title}
            imageUrl={items.imageUrl}
            chapterLength={items.chapter.length}
            price={items.price}
            progress={items.progress}
            category={items?.category?.name}
          />
          ) : (
            <div className="text-center text-sm text-muted-foreground mt-10">
              No Courses Found
            </div>
          )}
        </div>
      </div>
    </>
  );
};
