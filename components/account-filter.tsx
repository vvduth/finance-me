"use client";
import React from "react";
import qs from "query-string";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAccount } from "@/features/accounts/api/use-get-account";

const AccountFilter = () => {
  const router = useRouter();
  const pathName = usePathname();

  const params = useSearchParams();
  const accountId = params.get("accountId") || "all";
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const { data: accounts, isLoading: isLoadingAccount } = useGetAccount();

  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue,
      from,
      to,
    };

    if (newValue === "all") {
      query.accountId = "";
    }

    const url = qs.stringifyUrl(
      {
        url: pathName,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };
  return (
    <Select value={accountId} onValueChange={onChange} disabled={isLoadingAccount}>
      <SelectTrigger
        className="lg:w-auto
          w-full h-9 rounded-md px-3 font-normal
          bg-white/10 hover:bg-white-20 hover:text-white border-none focus:ring-offset-0
          focus:ring-transparent
          outline-none text-white focus:bg-white/30 transition
         "
      >
        <SelectValue placeholder="Select account" />
        <SelectContent>
          <SelectItem value="all">All accounts</SelectItem>
          {accounts?.map((account) => (
            <SelectItem key={account.id} value={account.id}>
              {account.name}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectTrigger>
    </Select>
  );
};

export default AccountFilter;
