import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Pencil, Trash, Underline } from "lucide-react";

type Props = {
  data: {
    name: string;
  };
};

const AcordionItem = ({ data }: Props) => {
  return (
    <AccordionItem
      value={"item-" + Math.random() * 100}
      className="w-full px-4"
    >
      <AccordionTrigger>{data.name}</AccordionTrigger>
      <AccordionContent>
        <div className="flex justify-end space-x-2">
          <Trash />
          <Underline />
          <Pencil />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AcordionItem;
