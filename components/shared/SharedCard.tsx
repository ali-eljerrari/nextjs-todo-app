"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dispatch, SetStateAction, useState } from "react";
import { Accordion } from "../ui/accordion";
import AcordionItem from "./AcordionItem";
import SharedForm from "./SharedForm";

export type Todo = {
  name: string;
};

export type propsType = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

const SharedCard = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const ShowTodos = () => {
    if (!todos.length) {
      return <div className="w-full text-center">No Todos!</div>;
    }

    return (
      <Accordion
        type="single"
        collapsible
        style={{ width: "100%", height: "70vh", overflowY: "scroll" }}
      >
        {todos?.map((todo, index) => {
          return <AcordionItem key={index} data={todo} />;
        })}
      </Accordion>
    );
  };

  return (
    <Card style={{ width: "50%", height: "100%", margin: "auto" }}>
      <CardHeader>
        <CardTitle>Nextjs Todo App</CardTitle>
        <CardDescription>
          Next.js Todo App: Your go-to for seamless task management, combining
          React&apos;s power with intuitive UI for effortless organization.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SharedForm setTodos={setTodos} todos={todos} />
      </CardContent>
      <CardFooter>{ShowTodos()}</CardFooter>
    </Card>
  );
};

export default SharedCard;
