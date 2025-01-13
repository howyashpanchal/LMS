"use client";

import { Category } from "@prisma/client";
import { IconType } from "react-icons";

interface CategoriesProps {
  items: Category[];
}

import {
  FcEngineering,
  FcMusic,
  FcCamcorderPro,
  FcDoughnutChart,
  FcSportsMode,
  FcCamera,
} from "react-icons/fc";
import { CategoryItem } from "./category-item";

const iconMap: Record<Category["name"], IconType> = {
  Music: FcMusic,
  "Computer Science": FcEngineering,
  Cooking: FcDoughnutChart,
  Videography: FcCamcorderPro,
  Fitness: FcSportsMode,
  Photography: FcCamera,
};

export const Categories = async ({ items }: CategoriesProps) => {
  return (
    <>
      <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
        {items.map((item) => (
          <CategoryItem
            key={item.id}
            label={item.name}
            icon={iconMap[item.name]}
            value={item.id}
          />
        ))}
      </div>
    </>
  );
};
