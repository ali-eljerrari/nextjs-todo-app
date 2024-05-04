"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

import { z } from "zod";

import { setDBTodos } from "@/lib/actions/appwrite.actions";
import { Todo, propsType } from "@/typings";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(3).max(64).trim(),
});

const SharedForm = ({ setTodos, todos }: propsType) => {
  const [todo, setTodo] = useState<Todo | null>(null);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setTodo({
      // $collectionId: "", // Fill this with appropriate values
      // $databaseId: "", // Fill this with appropriate values
      // $id: "", // Fill this with appropriate values
      // $permissions: [], // Fill this with appropriate values
      // $updatedAt: "", // Fill this with appropriate values
      // completedAt: null,
      // $createdAt: "", // Fill this with appropriate values
      isDone: false,
      createdAt: new Date(),
      name: values.name,
    });
  }

  useEffect(() => {
    if (todo?.name) {
      //? push todos to the database

      setDBTodos(todo).then(
        (response) => {
          toast({
            variant: "default",
            title: "Success!",
            description: "Todo addedd Successfully!",
            className: "bg-green-900 text-white",
            duration: 5000,
          });

          setTodos([...todos, todo]);

          //? form reset
          form.reset();
        },
        (error) => {
          toast({
            variant: "destructive",
            title: "Error!",
            description: error.message,
            duration: 5000,
          });
        }
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todo]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Type Todo..."
                  {...field}
                  className="flex-1"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Add Todo</Button>
      </form>
      <Toaster />
    </Form>
  );
};

export default SharedForm;
