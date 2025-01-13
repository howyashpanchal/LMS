"use client";

import { Search } from "lucide-react";
import qs from "query-string";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debounceValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debounceValue, currentCategoryId, router, pathname]);

  return (
    <>
      <div className="relative">
        <Search className="h-4 w-4 text-slate-600 absolute left-2 top-1/2 transform -translate-y-1/2" />
        <Input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="w-full md:w-[300px] rounded-md bg-slate-100 border border-slate-300 focus:border-slate-500 focus-visible:ring-slate-200 focus-visible:ring-2 p-2 pl-8"
          placeholder="Search for a course..."
        />
      </div>
    </>
  );
};
