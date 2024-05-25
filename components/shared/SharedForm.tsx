"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

import { z } from "zod";

import { setDBTodos } from "@/lib/actions/appwrite.actions";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1).max(64),
  description: z.string().min(1).max(64),
});

const SharedForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const todo = {
      // $collectionId: "", // Fill this with appropriate values
      // $databaseId: "", // Fill this with appropriate values
      // $id: "", // Fill this with appropriate values
      // $permissions: [], // Fill this with appropriate values
      // $updatedAt: "", // Fill this with appropriate values
      // completedAt: null,
      // $createdAt: "", // Fill this with appropriate values
      isDone: false,
      name: values.name,
      description: values.description,
    };

    console.log(todo);

    if (!todo?.name.length || !todo?.description.length) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Please fill all the fields!",
        duration: 5000,
      });
      return;
    }
    if (todo?.name.length > 64) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "name should remain within 64 characters or less!",
        duration: 5000,
      });
      return;
    }

    if (todo?.description.length > 256) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "description should remain within 256 characters or less!",
        duration: 5000,
      });
      return;
    }

    //? push todos to the database
    setDBTodos(todo).then(
      (_response) => {
        toast({
          variant: "default",
          title: "Success!",
          description: "Todo addedd Successfully!",
          className: "bg-green-900 text-white",
          duration: 5000,
        });

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        {/* <div className="flex flex-col w-full"> */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full mb-2">
              <FormControl>
                <Input
                  placeholder="Type Todo..."
                  {...field}
                  className="flex-1 py-6"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full mb-2">
              <FormControl>
                <Input
                  placeholder="Type Description..."
                  {...field}
                  className="flex-1 py-8"
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* </div> */}
        <Button type="submit" size={"stretchY"}>
          Add Todo
        </Button>
        {/* //TODO add filter button (ASC & DESC) */}
      </form>
      <Toaster />
    </Form>
  );
};

export default SharedForm;
