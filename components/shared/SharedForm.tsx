"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Todo, propsType } from "./SharedCard";

const formSchema = z.object({
  name: z.string().min(3).max(64).trim(),
});

const SharedForm = ({ setTodos, todos }: propsType) => {
  const [todo, setTodo] = useState<Todo | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setTodo(values);
  }

  useEffect(() => {
    if (todo?.name) {
      setTodos([...todos, todo]);
      form.reset();
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
    </Form>
  );
};

export default SharedForm;
