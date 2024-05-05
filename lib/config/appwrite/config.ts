import { Client, Databases } from "appwrite";

export const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;

const projectid = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

client.setEndpoint(endpoint).setProject(projectid);

export const databases = new Databases(client);
