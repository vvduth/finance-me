import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetAccount } from "../api/use-get-account";
import { useCreateAccount } from "../api/use-create-account";
import { Select } from "@/components/select";

const useSelectAccount = (
): [() => JSX.Element, () => Promise<unknown>] => {

  const accountQuery = useGetAccount();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) => accountMutation.mutate({name})
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id
  }))

  const [promise, setPromise] = useState<{
    resolve: (value: string| undefined) => void;
  } | null>(null);

  const selectValue = useRef<string>();

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(selectValue.current);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(undefined);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>Please Select an account to continue</DialogDescription>
        </DialogHeader>
        <Select 
          placeholder="Select an account"
          options={accountOptions}
          onChange={(value) => selectValue.current = value}
          onCreate={onCreateAccount}
          disabled={accountQuery.isLoading || accountMutation.isPending}
        />
        <DialogFooter className="pt-2">
          <Button onClick={handleCancel} variant={"outline"}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Okay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm];
};

export default useSelectAccount;
