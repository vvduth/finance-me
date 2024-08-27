"use client";

import { Button } from "@/components/ui/button";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

export default function Home() {
  
  const {isOpen, onClose, onOpen} = useNewAccount();
  const { data: accounts, isLoading } = useGetAccount();

  if (isLoading) {
    return <div>Is loading</div>;
  }
  return (
    <div>
     <Button onClick={onOpen}>
        Add new Account
     </Button>
    </div>
  );
}
