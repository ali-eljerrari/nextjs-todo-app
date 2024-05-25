import { Todo } from "@/typings";
import { ID } from "appwrite";
import { databases } from "../config/appwrite/config";

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

export const getDBTodos = async () => {
  return await databases.listDocuments(databaseId, collectionId);

  // return todos.documents;
};

export const setDBTodos = async (todo: Todo) => {
  return await databases.createDocument(
    databaseId,
    collectionId,
    ID.unique(),
    todo
  );
};

export const deleteDBTodo = async ($id: string) => {
  await databases.deleteDocument(databaseId, collectionId, $id!);
};

export const updateDBTodo = async (documentId: string, state: object) => {
  await databases.updateDocument(databaseId, collectionId, documentId, state);
};
