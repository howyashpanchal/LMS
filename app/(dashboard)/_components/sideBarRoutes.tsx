"use client";
import { BarChart, Compass, Layout, List } from "lucide-react";
import { SideBarItems } from "./sideBarItems";
import { usePathname } from "next/navigation";
const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browser",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytic",
    href: "/teacher/analytics",
  },
];
export const SideBarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <>
      <div className="flex flex-col w-full">
        {routes.map((route) => (
          <SideBarItems
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      </div>
    </>
  );
};
