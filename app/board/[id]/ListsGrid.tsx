"use client";

import ListColumn from "../../components/ListColumn";
import AddList from "../../components/AddList";

export default function ListsGrid({
  boardId,
  lists,
}: {
  boardId: string;
  lists: any[];
}) {
  return (
    <div className="flex items-start gap-4 overflow-x-auto pb-10">
      {lists.map((list) => (
        <ListColumn key={list._id} list={list} />
      ))}

      <AddList boardId={boardId} />
    </div>
  );
}
