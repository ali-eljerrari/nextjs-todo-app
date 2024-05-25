import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { updateDBTodo } from "@/lib/actions/appwrite.actions";
import { useEffect, useState } from "react";

type props = {
  $id: string | undefined;
  isOpen: boolean;
  setIsOpen: any;
  data: {
    name: string;
    description: string;
  };
};

const SharedSheet = ({ $id, isOpen, setIsOpen, data }: props) => {
  const [input, setInput] = useState({ name: "", description: "" });

  useEffect(() => {
    setInput({ ...data });
  }, []);

  return (
    <Sheet open={isOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Todo</SheetTitle>
          <SheetDescription>
            Make changes to your todo here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={input.description}
              onChange={(e) =>
                setInput({ ...input, description: e.target.value })
              }
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={"outline"} onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </SheetClose>
          <Button
            onClick={() => {
              updateDBTodo($id!, input);
              setIsOpen(false);
            }}
          >
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SharedSheet;
