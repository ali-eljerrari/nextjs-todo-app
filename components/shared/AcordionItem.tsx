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
import { deleteDBTodo } from "@/lib/actions/appwrite.actions";

type Props = {
  data: {
    description?: string | undefined;
    name: string;
    $id?: string | undefined;
  };
};

const AcordionItem = ({ data }: Props) => {
  const handleRemoveTodo = ($id: string | undefined): void => {
    deleteDBTodo($id);
  };

  return (
    <AccordionItem value={data.$id || ""} className="w-full px-4">
      <AccordionTrigger>{data.name}</AccordionTrigger>
      <AccordionContent>{data.description}</AccordionContent>
      <AccordionContent className="py-6">
        <div className="flex justify-end space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Pencil
                  size={32}
                  className="hover:cursor-pointer hover:text-red-900"
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
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Done</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Trash
                  size={32}
                  className="hover:cursor-pointer hover:text-red-900"
                  onClick={() => handleRemoveTodo(data.$id)}
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
  );
};

export default AcordionItem;
