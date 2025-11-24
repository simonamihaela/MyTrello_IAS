"use server";

import clientPromise from "./lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

// Add a new board to the database
export async function addBoard(name: string) {
  if (!name || name.trim() === "") return;

  const client = await clientPromise;
  const db = client.db("MyTrelloDB");

  await db.collection("Boards").insertOne({
    name: name.trim()
  });

  revalidatePath("/");
}

// Edit an existing board's name
export async function editBoard(id: string, newName: string) {
  if (!newName.trim()) return;
  const client = await clientPromise;
  const db = client.db("MyTrelloDB");

  await db.collection("Boards").updateOne(
    { _id: new ObjectId(id) },
    { $set: { name: newName.trim() } }
  );

  revalidatePath("/");
}

// Delete a board
export async function deleteBoard(id: string) {
  const client = await clientPromise;
  const db = client.db("MyTrelloDB");

  await db.collection("Boards").deleteOne({ _id: new ObjectId(id) });

  revalidatePath("/");
}

// Add a list to a board
export async function addList(boardId: string, name: string) {
  const client = await clientPromise;
  const db = client.db("MyTrelloDB");

  await db.collection("Lists").insertOne({
    boardId: new ObjectId(boardId),
    name,
    position: Date.now()
  });

  revalidatePath(`/board/${boardId}`);
}

// Add a task to a list
export async function addTask(listId: string, title: string, description: string) {
  const client = await clientPromise;
  const db = client.db("MyTrelloDB");

  await db.collection("Tasks").insertOne({
    listId: new ObjectId(listId),
    title,
    description,
    position: Date.now()
  });

  revalidatePath("board page path here");
}

// Update a task
export async function updateTask(id: string, title: string, description: string) {
  const client = await clientPromise;
  const db = client.db("MyTrelloDB");

  await db.collection("Tasks").updateOne(
    { _id: new ObjectId(id) },
    { $set: { title, description } }
  );

  revalidatePath("/");
}

// Delete a task
export async function deleteTask(id: string) {
  const client = await clientPromise;
  const db = client.db("MyTrelloDB");

  await db.collection("Tasks").deleteOne({
    _id: new ObjectId(id),
  });

  revalidatePath("/");
}

// Update a list's name
export async function updateListName(listId: string, newName: string) {
  const client = await clientPromise;
  const db = client.db("MyTrelloDB");

  await db.collection("Lists").updateOne(
    { _id: new ObjectId(listId) },
    { $set: { name: newName } }
  );

  revalidatePath("/");
}

// Delete a list and its associated tasks
export async function deleteListAndTasks(listId: string) {
  const client = await clientPromise;
  const db = client.db("MyTrelloDB");

  await db.collection("Tasks").deleteMany({ listId });
  await db.collection("Lists").deleteOne({ _id: new ObjectId(listId) });

  revalidatePath("/");
}
