import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { cn } from "@/lib/utils";

type Props = {
    id: string, 
    account: string, 
    accountID: string
}

export const AccountColumn = ({id, account, accountID}: Props )=> {

    const {onOpen: onOpenAccount} = useOpenAccount()

    const onCLick = () => {
        onOpenAccount(accountID)
    }
    return (
        <div
         className="flex items-center 
         cursor-pointer hover:underline"
         onClick={onCLick}
        >
            {account}
        </div>
    )
}