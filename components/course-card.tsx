interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chapterLength: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCard = ({ id, title, imageUrl }: CourseCardProps) => {
  return (
    <>
      <div>hello</div>
    </>
  );
};
