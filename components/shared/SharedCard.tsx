"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getDBTodos } from "@/lib/actions/appwrite.actions";
import { Todo } from "@/typings";
import { useEffect, useState } from "react";
import { Accordion } from "../ui/accordion";
import { Toaster } from "../ui/toaster";
import { useToast } from "../ui/use-toast";
import AcordionItem from "./AcordionItem";
import SharedForm from "./SharedForm";

const SharedCard = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    getDBTodos()
      .then((response) => {
        const todosData: Todo[] = response.documents.map((document: any) => ({
          $collectionId: document.$collectionId,
          $createdAt: document.$createdAt,
          $databaseId: document.$databaseId,
          $id: document.$id,
          $permissions: document.$permissions,
          $updatedAt: document.$updatedAt,
          completedAt: document.completedAt,
          createdAt: document.createdAt,
          isDone: document.isDone,
          name: document.name,
        }));
        setTodos(todosData);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Error!",
          description: error.message,
          className: "bg-red-900 text-white",
          duration: 5000,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ShowTodos = () => {
    if (!todos.length) {
      return (
        <div className="flex flex-col w-full overflow-y-scroll h-[78vh] px-4">
          {Array.from({ length: 10 }, (v, i) => {
            return (
              <div key={i} className="space-y-2 my-2 w-full">
                {Array.from({ length: 2 }, (v, i) => {
                  return (
                    <Skeleton
                      key={i}
                      className="h-6"
                      style={{ backgroundColor: "#0000002f" }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <Accordion
        type="single"
        collapsible
        className="w-full h-[70vh] overflow-y-scroll"
      >
        {todos?.map((todo, index) => {
          return <AcordionItem key={index} data={todo} />;
        })}
      </Accordion>
    );
  };

  return (
    <Card className="w-full lg:min-w-[900px] h-full mx-auto lg:max-w-[60%]">
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
      <Toaster />
    </Card>
  );
};

export default SharedCard;
