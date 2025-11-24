import clientPromise from "./lib/mongodb";
import MainContent from "./components/MainContent";
import posthog from 'posthog-js';

export const dynamic = "force-dynamic";

export default async function HomePage() {
  posthog.capture('Dashboard');
  console.log('Dashboard event tracked');

  const client = await clientPromise;
  const db = client.db("MyTrelloDB");

  // Get all boards from the database
  const boards = await db.collection("Boards").find({}).toArray();
  const boardsClean = boards.map(b => ({
    _id: b._id.toString(),
    name: b.name
  }));

  return (
    <main className="min-h-screen p-8 bg-blue-100">
      <h1 className="text-4xl font-bold text-center text-blue-900">My Trello</h1>
      <MainContent boards={boardsClean} />
    </main>
  );
}
