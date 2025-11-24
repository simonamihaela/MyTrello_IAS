## [My Trello](https://my-trello-2v8oqf9gn-simonamihaelas-projects.vercel.app/)

A minimalist Trello-inspired task management app built with Next.js, React, and MongoDB.
Users can create boards, lists, and tasks, edit them inline, and manage workflow visually through a clean and simple interface.

## Implementation Overview
The application is built using Next.js 14 (App Router) and follows a clean separation between Server Components, Client Components, and Server Actions.

### Server Components (Data Loading)

Pages such as /board/[id] run on the server, where they:
- Fetch the board, lists, and tasks from MongoDB
- Convert database documents into serializable objects
- Pass data to client components efficiently

This approach improves performance and keeps database access secure.

### Client Components (Interactive UI)

Components that handle user interactions—such as adding boards, editing tasks, or opening modals—are implemented as Client Components.
Examples include:
- TaskCard and TaskModal
- ListColumn
- AddTask, AddList, AddBoardModal

These components manage local state, handle user input, and trigger server actions.

### Server Actions (CRUD Logic)

All database operations (Add, Update, Delete) are implemented using Next.js Server Actions, which run only on the server:
- addBoard, editBoard, deleteBoard
- addList, editList, deleteList
- addTask, updateTask, deleteTask

After each operation, the app uses revalidatePath() to refresh the UI automatically.

This avoids API route boilerplate and keeps logic centralized, clean, and secure.

### Modal System
Modals (for editing boards or tasks) use local component state:
- Clicking a card opens a modal with the task details
- Editing updates local state
- Saving triggers a server action
- The modal stays open and switches back to “view mode” without reloading the page

This creates a smooth, desktop-app-like UX.

## Database
For this project, I chose [MongoDB Atlas](mongodb.com) as the primary database because it offers flexibility, speed, and a schema structure that fits perfectly with a Trello-style application.

Boards, lists, and tasks are naturally represented as JSON-like documents. This allows an intuitive mapping between the UI state and the database. It is perfect for evolving features (like adding due dates, labels, attachments later). MongoDB lets the data model grow incrementally without schema migrations.

Collections:
- Boards
    ```bash
    {
        "_id": ObjectId,
        "name": "Work projects"
    }
    ```
- Lists
    ```bash
    {
        "_id": ObjectId,
        "boardId": ObjectId,
        "name": "To Do",
        "position": Number
    }
    ```
- Tasks
    ```bash
    {
        "_id": ObjectId,
        "listId": ObjectId,
        "title": "Finish report",
        "description": "Send it before Monday",
        "position": Number
    }
    ```

## Metrics Collection
I integrated [Posthog](posthog.com) to better understand how users interact with the app and to guide future improvements based on real behavior—not assumptions.

I chose Posthog because it has different advantages:
- It allows tracking clicks, page views, modal opens, and CRUD actions with minimal setup.
- Features such as funnels, retention insights, and heatmaps help identify where users drop off or what features they use the most.
- When debugging UX issues, seeing real user sessions helps identify problems instantly.

## Deployed App
Please access https://my-trello-2v8oqf9gn-simonamihaelas-projects.vercel.app/ 

## Installation & Setup
1. Clone the project
```bash
git clone https://github.com/<your-username>/my-trello.git
cd my-trello
```
2. Install dependencies
```bash
npm install
```
3. Run the development server:

```bash
npm run dev
```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

