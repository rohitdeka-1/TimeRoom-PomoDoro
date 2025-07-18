import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faPlus } from "@fortawesome/free-solid-svg-icons";

const rooms = [
  { id: 1, name: "Alpha", members: 2, capacity: 3, live: true },
  { id: 2, name: "Beta", members: 3, capacity: 3, live: true },
  { id: 3, name: "Gamma", members: 1, capacity: 3, live: false },
];

const RoomFinder = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="bg-slate-100/80 flex flex-col rounded-xl shadow-lg h-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Rooms</h1>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition">
            <FontAwesomeIcon icon={faPlus} />
            Create Room
          </button>
        </div>
        {/* Room List */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {rooms.map((room) => {
            const isFull = room.members >= room.capacity;
            return (
              <div
                key={room.id}
                className="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={`text-lg ${room.live && !isFull ? "text-green-500" : "text-gray-400"}`}
                  />
                  <span className="text-lg font-semibold text-gray-700">{room.name}</span>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${isFull ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                    {room.members}/{room.capacity} {isFull ? "Full" : "Open"}
                  </span>
                </div>
                <button
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    isFull
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                  disabled={isFull}
                >
                  Join
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoomFinder;
