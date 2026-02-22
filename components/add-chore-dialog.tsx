"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { addChore, updateChore } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Database } from "@/lib/database.types";

type Chore = Database["public"]["Tables"]["chores"]["Row"];

interface ChoreDialogProps {
  chore?: Chore;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function ChoreDialog({
  chore,
  open: controlledOpen,
  onOpenChange,
  trigger,
}: ChoreDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setIsOpen = isControlled ? onOpenChange! : setInternalOpen;

  const isEditMode = !!chore;

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    if (isEditMode) {
      await updateChore(chore.id, formData);
    } else {
      await addChore(formData);
    }
    setIsLoading(false);
    setIsOpen(false);
  }

  return (
    <>
      {trigger && <div onClick={() => setIsOpen(true)}>{trigger}</div>}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogOverlay>
          <DialogContent aria-labelledby="dialog-title">
            <DialogHeader>
              <DialogTitle id="dialog-title">
                {isEditMode ? "Edit Bounty" : "Post a Bounty"}
              </DialogTitle>
              <DialogClose />
            </DialogHeader>

            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  required
                  defaultValue={chore?.title || ""}
                  placeholder="e.g. Wash the dishes"
                  aria-required="true"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={2}
                  defaultValue={chore?.description || ""}
                  placeholder="Additional details..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="xp">Gold Reward</Label>
                <Select
                  id="xp"
                  name="xp"
                  defaultValue={String(chore?.base_xp || 10)}
                >
                  <option value="10">10 Gold — Minor Errand</option>
                  <option value="20">20 Gold — Standard Task</option>
                  <option value="50">50 Gold — Major Deed</option>
                  <option value="100">100 Gold — Epic Quest</option>
                </Select>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  aria-busy={isLoading}
                  className="flex-1"
                >
                  {isLoading && (
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  {isLoading
                    ? isEditMode
                      ? "Saving..."
                      : "Posting..."
                    : isEditMode
                      ? "Save Changes"
                      : "Post Bounty"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </>
  );
}

export function AddChore() {
  return (
    <ChoreDialog
      trigger={
        <Button size="sm">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Post Bounty
        </Button>
      }
    />
  );
}
