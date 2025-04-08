"use client";

import { useState, useRef } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Home, Settings, LayoutGrid, User, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { CardType, ColumnType, BoardData } from "@/types";

const sidebarNav = [{ id: "kanban", label: "Kanban Board", icon: Home }];

const initialData: BoardData = {
  "column-1": {
    id: "column-1",
    title: "Backlog",
    cards: [{ id: "card-1", content: "Example task" }],
  },
  "column-2": {
    id: "column-2",
    title: "Design",
    cards: [{ id: "card-2", content: "Design & Research" }],
  },
  "column-3": {
    id: "column-3",
    title: "To-Do",
    cards: [],
  },
  "column-4": {
    id: "column-4",
    title: "Doing",
    cards: [],
  },
};

export default function Page() {
  const [columns, setColumns] = useState<BoardData>(initialData);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [newCardContent, setNewCardContent] = useState("");
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [showNewColumnForm, setShowNewColumnForm] = useState(false);
  const newListInputRef = useRef<HTMLInputElement | null>(null);
  const newCardContentInputRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];

    const sourceCards = Array.from(sourceCol.cards);
    const destCards = Array.from(destCol.cards);
    const [movedCard] = sourceCards.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceCards.splice(destination.index, 0, movedCard);
      setColumns({
        ...columns,
        [sourceCol.id]: { ...sourceCol, cards: sourceCards },
      });
    } else {
      destCards.splice(destination.index, 0, movedCard);
      setColumns({
        ...columns,
        [sourceCol.id]: { ...sourceCol, cards: sourceCards },
        [destCol.id]: { ...destCol, cards: destCards },
      });
    }
  };

  const handleAddCard = () => {
    if (newCardContent.trim() === "" || selectedColumn === null) return;

    const newCard: CardType = {
      id: `card-${Date.now()}`, // Unique ID based on timestamp
      content: newCardContent,
    };

    const column = columns[selectedColumn];
    const updatedColumn = {
      ...column,
      cards: [...column.cards, newCard],
    };

    setColumns({
      ...columns,
      [selectedColumn]: updatedColumn,
    });

    // Reset the input fields
    setNewCardContent("");
    setSelectedColumn(null); // Hide the form after adding the card
  };

  const handleAddColumn = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (newColumnTitle.trim() === "") return;

    const newColumnId = `column-${Date.now()}`;
    const newColumn: ColumnType = {
      id: newColumnId,
      title: newColumnTitle,
      cards: [],
    };

    setColumns({
      ...columns,
      [newColumnId]: newColumn,
    });

    // Reset the column input and hide form
    setNewColumnTitle("");
    setShowNewColumnForm(false);

    // Focus input if form is shown
    if (newListInputRef.current) {
      newListInputRef.current.focus();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside
        className="w-64 z-10 relative hidden md:flex bg-gray-900 text-white flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 font-bold text-xl border-b border-gray-700">
          MyBoard
        </div>
        <nav className="flex-1 px-2 py-4">
          {sidebarNav.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg mb-2 transition ${
                activeNav === item.id
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b">
          <h1 className="text-xl font-semibold">Project Workspace</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="border px-3 py-1 rounded-md text-sm"
            />
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              U
            </div>
          </div>
        </header>

        {/* Board */}
        <main
          className="flex-1 overflow-x-auto overflow-y-hidden"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x322/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg')",
          }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start px-6 py-8 md:space-x-6 ">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex flex-col md:flex-row gap-6 w-full  md:min-w-max">
                {Object.entries(columns).map(([columnId, column]) => (
                  <Droppable key={columnId} droppableId={columnId}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`bg-[#101204] text-[#9FADBC] max-h-fit w-full md:w-72 min-w-[18rem] rounded-lg p-4 flex-shrink-0 transition-shadow duration-300 ${
                          snapshot.isDraggingOver ? "shadow-2xl" : ""
                        }`}
                      >
                        <h2 className="font-bold mb-3 text-lg">
                          {column.title}
                        </h2>
                        {column.cards.map((card, index) => (
                          <Draggable
                            key={card.id}
                            draggableId={card.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`hover:border-white rounded-xl bg-[#22272B] border-transparent border-4 p-3 mb-3 shadow-md  ${
                                  snapshot.isDragging ? "scale-105" : ""
                                }`}
                                onClick={() => {
                                  router.push("/modal/" + card.id);
                                }}
                              >
                                {card.content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}

                        {selectedColumn === column.id ? (
                          <form className="">
                            <textarea
                              value={newCardContent}
                              onChange={(e) =>
                                setNewCardContent(e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  handleAddCard();
                                }
                              }}
                              ref={newCardContentInputRef}
                              placeholder="Enter card content..."
                              rows={2}
                              className="w-full bg-[#22272B] resize-none p-3 border rounded-md"
                            ></textarea>
                            <div className="flex items-center">
                              <button
                                type="submit"
                                onClick={handleAddCard}
                                className="bg-blue-500 text-md text-white px-2 rounded-xs"
                              >
                                Add Card
                              </button>
                              <button
                                type="button"
                                title="Close"
                                onClick={() => setSelectedColumn(null)}
                                className="text-white cursor-pointer px-2 rounded-xs "
                              >
                                <X />
                              </button>
                            </div>
                          </form>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedColumn(column.id);
                              setTimeout(() => {
                                newCardContentInputRef.current?.focus();
                              }, 0);
                            }}
                            className="mt-2 px-2 text-sm rounded-md hover:bg-[#9fadbc38] w-full py-[5px] text-start cursor-pointer"
                          >
                            ➕ Add a card
                          </button>
                        )}
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>

              {/* Add New Column Button */}
              {!showNewColumnForm ? (
                <button
                  onClick={() => {
                    setShowNewColumnForm(true);
                    setTimeout(() => {
                      newListInputRef.current?.focus();
                    }, 0);
                  }}
                  className="bg-[#22272b63] min-w-[200px] mt-4 md:mt-0 text-start w-full text-xs cursor-pointer hover:bg-[#22272bc4] text-white px-6 py-2 rounded-md"
                >
                  ➕ Add Another List
                </button>
              ) : (
                <form
                  className="bg-[#101204] rounded-lg p-1 w-full mt-4 md:mt-0"
                  onSubmit={handleAddColumn}
                >
                  <input
                    type="text"
                    ref={newListInputRef}
                    value={newColumnTitle}
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                    placeholder="Enter list name..."
                    className="border rounded-md mb-2 w-full py-1 md:w-auto px-2 bg-slate-500"
                  />
                  <br />
                  <div className="flex items-center">
                    <button
                      type="submit"
                      className="bg-blue-500 text-md text-white px-2 rounded-xs"
                    >
                      Add List
                    </button>
                    <button
                      type="button"
                      title="Close"
                      onClick={() => setShowNewColumnForm(false)}
                      className="text-white px-2 rounded-xs ml-2"
                    >
                      <X />
                    </button>
                  </div>
                </form>
              )}
            </DragDropContext>
          </div>
        </main>
      </div>
    </div>
  );
}
