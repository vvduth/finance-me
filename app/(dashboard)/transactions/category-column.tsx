
import { cn } from "@/lib/utils";
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { TriangleAlert } from "lucide-react";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
type Props = {
    id: string, 
   category: string | null, 
   categoryID: string |null
}

export const CategoryColumn = ({id,category,categoryID}: Props )=> {

    const {onOpen: onOpenCategory} = useOpenCategory()
    const {onOpen: onOpenTransaction} = useOpenTransaction()

    const onCLick = () => {
        if (categoryID) {
            onOpenCategory(categoryID)
        } else {
            onOpenTransaction(id)
        }
    }
    return (
        <div
         className={cn(`flex items-center 
         cursor-pointer hover:underline`, 
        !category && "text-rose-500")}
         onClick={onCLick}
        >
            {!category && <TriangleAlert className="size-4 mr-2 shrink-0" />}
            {category || "Uncategorized"}
        </div>
    )
}