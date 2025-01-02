"use client";
import { Compass, Layout } from "lucide-react";
import { SideBarItems } from "./sideBarItems";
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
export const SideBarRoutes = () => {
  const routes = guestRoutes;

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
