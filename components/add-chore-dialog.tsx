"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { addChore } from "@/app/dashboard/actions";
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

export function AddChore() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    await addChore(formData);
    setIsLoading(false);
    setIsOpen(false);
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="sm">
        <Plus className="h-4 w-4" aria-hidden="true" />
        New quest
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogOverlay>
          <DialogContent aria-labelledby="dialog-title">
            <DialogHeader>
              <div>
                <p className="text-xs font-semibold tracking-[0.12em] text-slate-400 uppercase">
                  New quest
                </p>
                <DialogTitle id="dialog-title">Add to your board</DialogTitle>
              </div>
              <DialogClose />
            </DialogHeader>

            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Quest title</Label>
                <Input
                  id="title"
                  name="title"
                  required
                  placeholder="e.g. Wash the dishes"
                  aria-required="true"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="Details about the quest..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="xp">XP reward</Label>
                <Select id="xp" name="xp">
                  <option value="10">10 XP (Easy)</option>
                  <option value="20">20 XP (Medium)</option>
                  <option value="50">50 XP (Hard)</option>
                  <option value="100">100 XP (Epic)</option>
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
                  {isLoading ? "Creating..." : "Create quest"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </>
  );
}
