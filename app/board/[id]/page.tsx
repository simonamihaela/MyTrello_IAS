import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import ListsGrid from "./ListsGrid";
import posthog from 'posthog-js';

export default async function BoardPage({ params }:{ params: Promise<{ id: string }> }) { 
  posthog.capture('View board');
  console.log('View board event tracked');

  const { id } = await params;
  const cleanId = id?.toString().trim();

  if (!ObjectId.isValid(cleanId)) {
    return (
        <div className="text-white p-6 text-xl">
            Invalid board ID: {cleanId}
        </div>
    );
  }

  // Connect to db and get board data
  const client = await clientPromise;
  const db = client.db("MyTrelloDB");

  const board = await db.collection("Boards").findOne({
      _id: new ObjectId(cleanId),
  });

  if (!board) {
      return (
          <div className="text-white p-6 text-xl">
              Board not found
          </div>
      );
  }

  // Get lists associated with the board
  const lists = await db.collection("Lists").find({ boardId: new ObjectId(cleanId) }).toArray();

  // Get tasks associated with the lists
  const listIds = lists.map((l) => l._id.toString());

  const tasks = (await db
    .collection("Tasks")
    .find({ listId: { $in: lists.map(l => l._id) } })
    .toArray()
  ).map((t: any) => ({
    ...t,
    listId: t.listId.toString(),
    _id: t._id.toString(),
  }));
    
  const listsWithTasks = lists.map((l: any) => ({
    ...l,
    tasks: tasks.filter((t: any) => t.listId === l._id.toString()),
  }));

  // Send data to client component
  const serializableLists = listsWithTasks.map((l: any) => ({
    _id: l._id.toString(),
    boardId: l.boardId.toString(),
    name: l.name,
    position: typeof l.position === "number" ? l.position : Number(l.position),
    tasks: l.tasks.map((t: any) => ({
      ...t,
      _id: t._id.toString(),
      listId: t.listId.toString(),
      position: typeof t.position === "number"
          ? t.position
          : Number(t.position),
    })),
  }));

  return (
      <div className="min-h-screen p-8 text-white bg-blue-100">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">{board.name}</h1>

        <ListsGrid
            boardId={cleanId}
            lists={serializableLists}
        />
      </div>
  );
}
