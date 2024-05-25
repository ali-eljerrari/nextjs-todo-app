import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Pencil, Trash, Underline } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteDBTodo, updateDBTodo } from "@/lib/actions/appwrite.actions";
import SharedSheet from "./SharedSheet";
import { useState } from "react";

type Props = {
  data: {
    description: string;
    name: string;
    $id?: string | undefined;
    isDone: boolean | undefined;
  };
};

const AcordionItem = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleRemoveTodo = ($id: string): void => {
    deleteDBTodo($id);
  };

  return (
    <>
      <SharedSheet
        $id={data.$id}
        data={{ name: data.name, description: data.description }}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <AccordionItem value={data.$id || ""} className="w-full px-4">
        <AccordionTrigger className={data.isDone ? `line-through` : ""}>
          {data.name}
        </AccordionTrigger>
        <AccordionContent>{data.description}</AccordionContent>
        <AccordionContent className="py-6">
          <div className="flex justify-end space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Pencil
                    size={32}
                    className="hover:cursor-pointer hover:text-red-900"
                    onClick={() => setIsOpen(!isOpen)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Update</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Underline
                    size={32}
                    className="hover:cursor-pointer hover:text-red-900"
                    onClick={() =>
                      updateDBTodo(data.$id!, { isDone: !data.isDone })
                    }
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mark Done</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Trash
                    size={32}
                    className="hover:cursor-pointer hover:text-red-900"
                    onClick={() => handleRemoveTodo(data.$id!)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
};

export default AcordionItem;
