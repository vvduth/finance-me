"use client";

import { Button } from "@/components/ui/button";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";

export default function Home() {
  
  const {isOpen, onClose, onOpen} = useNewCategory();
  const { data: categories, isLoading } = useGetCategories();

  if (isLoading) {
    return <div>Is loading</div>;
  }
  return (
    <div>
     <Button onClick={onOpen}>
        Add new categories
     </Button>
    </div>
  );
}
