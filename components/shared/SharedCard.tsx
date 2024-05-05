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
import { client } from "@/lib/config/appwrite/config";
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
          isDone: document.isDone,
          name: document.name,
          description: document.description,
        }));

        const sortedTodos = todosData.sort((a, b) => {
          const adate = new Date(a.$createdAt!);
          const bdate = new Date(b.$createdAt!);
          const amsPassed = Date.now() - adate.getTime();
          const bmsPassed = Date.now() - bdate.getTime();

          return amsPassed - bmsPassed;
        });

        setTodos(sortedTodos);
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

  useEffect(() => {
    const unsubscribe = client.subscribe(
      "documents",
      (response: { payload: Todo; events: any }) => {
        //? delete
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          setTodos((prevTodos) =>
            prevTodos.filter((todo) => todo.$id !== response.payload.$id)
          );
        }

        //? create
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          setTodos((prevTodos) => [response.payload, ...prevTodos]);
        }

        //? update
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.update"
          )
        ) {
          //! filter the previous todo when it gets updated and it will be retrieved from the subscription
          //? insert the new todo
          setTodos((prevTodos) => [...prevTodos, response.payload]);
        }
      }
    );

    return () => {
      unsubscribe(); // Clean up subscription
    };
  }, [todos]);

  const ShowTodos = () => {
    if (!todos.length) {
      return (
        <div className="flex flex-col w-full overflow-y-auto h-[78vh] px-4">
          {Array.from({ length: 10 }, (_v, i) => {
            return (
              <div key={i} className="space-y-2 my-2 w-full">
                {Array.from({ length: 2 }, (_v, i) => {
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
        <SharedForm />
      </CardContent>
      <CardFooter>{ShowTodos()}</CardFooter>
      <Toaster />
    </Card>
  );
};

export default SharedCard;
