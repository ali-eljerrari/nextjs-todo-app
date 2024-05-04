import { Todo } from "@/typings";
import { ID } from "appwrite";
import { databases } from "../config/appwrite/config";

export const getDBTodos = () => {
  return databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!
  );
};

export const setDBTodos = (todo: Todo) => {
  return databases.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
    ID.unique(),
    todo
  );
};
