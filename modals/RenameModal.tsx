"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRenameModal } from "@/store/use-rename-modal";
import { useEffect, useState } from "react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const RenameModal = () => {
  const { isOpen, onOpen, onClose, initialValues } = useRenameModal();
  const [title, setTitle] = useState(initialValues.title);
  const { mutate, pending } = useApiMutation(api.board.update);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    mutate({
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success("Board title updated successfully");
        onClose();
      })
      .catch(() => toast.error("Failed to update board title"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {" "}
        <DialogHeader>
          <DialogTitle>Edit board Title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Board title"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
