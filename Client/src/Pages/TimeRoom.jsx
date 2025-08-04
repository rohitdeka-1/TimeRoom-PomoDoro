"use client"

import { useEffect, useState } from "react"
import { NavBar } from "../componenets/NavBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle, faPlus } from "@fortawesome/free-solid-svg-icons"
import { Users, Wifi, WifiOff, Search } from "lucide-react"

const TimeRoom = () => {
  const [hours, setHours] = useState("00")
  const [minutes, setMinutes] = useState("00")
  const [seconds, setSeconds] = useState("00")
  const [searchTerm, setSearchTerm] = useState("")

  const rooms = [
    { id: 1, name: "Alpha", members: 2, capacity: 3, live: true },
    { id: 2, name: "Beta", members: 3, capacity: 3, live: true },
    { id: 3, name: "Gamma", members: 1, capacity: 3, live: false },
    { id: 4, name: "Delta", members: 4, capacity: 5, live: true },
    { id: 5, name: "Epsilon", members: 0, capacity: 4, live: false },
    { id: 6, name: "Zeta", members: 2, capacity: 6, live: true },
    { id: 7, name: "Eta", members: 5, capacity: 5, live: true },
  ]

  const filteredRooms = rooms.filter(
    (room) => room.name.toLowerCase().includes(searchTerm.toLowerCase()) || room.id.toString().includes(searchTerm),
  )

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setHours(String(now.getHours()).padStart(2, "0"))
      setMinutes(String(now.getMinutes()).padStart(2, "0"))
      setSeconds(String(now.getSeconds()).padStart(2, "0"))
    }

    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-b from-black via-[#0f1e28] to-[#1a3a5d] min-h-screen text-white">
      <NavBar />
      <div className="h-screen font-bold pt-20 pb-10 flex flex-col lg:flex-row">
        {/* CLOCK */}
        <div className="py-3 flex flex-1 items-center space-x-1 justify-center">
          <p className="text-[5.9rem] flex justify-center">{hours}</p>
          <div className="flex flex-col justify-center space-y-6">
            <FontAwesomeIcon icon={faCircle} />
            <FontAwesomeIcon icon={faCircle} />
          </div>
          <p className="text-[5.9rem] flex justify-center">{minutes}</p>
          <div className="flex flex-col justify-center space-y-6">
            <FontAwesomeIcon icon={faCircle} />
            <FontAwesomeIcon icon={faCircle} />
          </div>
          <p className="text-[5.9rem] flex justify-center">{seconds}</p>
        </div>

        {/* ROOM FINDER */}
        <div className="p-4 flex-[6] flex flex-col h-full min-h-0">
          <div className="backdrop-blur-xl rounded-2xl shadow-2xl flex-1 flex flex-col border border-slate-700/50 min-h-0">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-2 border-b border-slate-700/50 flex-shrink-0">
              <div>
                <h1 className="text-3xl font-geist text-white mb-1">Rooms</h1>
                <p className="text-slate-400 text-sm">{filteredRooms.filter((r) => r.live).length} active rooms</p>
              </div>
              <button className="flex items-center gap-2 justify-center px-4 py-3 text-sm font-bold rounded-xl shadow-lg transition-all duration-200 text-white hover:shadow-blue-600/50 border border-slate-600">
                <FontAwesomeIcon icon={faPlus} />
                <p>Create Room</p>
              </button>
            </div>

            {/* Search Bar */}
            <div className="px-6 py-4 border-b border-slate-700/50 flex-shrink-0">
              <div className="relative ">
                <Search className="absolute  left-3 top-1/2   transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search rooms by ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-slate-700/70 transition-all duration-200"
                />
              </div>
            </div>

            {/* Room List */}
            <div className="flex-1 min-h-0 overflow-auto p-6 space-y-3">
              {filteredRooms.map((room) => {
                const isFull = room.members >= room.capacity
                const isActive = room.live && !isFull

                return (
                  <div
                    key={room.id}
                    className="group bg-slate-700/40 hover:bg-slate-700/60 rounded-xl p-3 shadow-lg border border-slate-600/40 hover:border-slate-500/60 transition-all duration-200 hover:shadow-xl hover:shadow-blue-700/40"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          {room.live ? (
                            <Wifi className="w-4 h-4 text-green-400" />
                          ) : (
                            <WifiOff className="w-4 h-4 text-slate-500" />
                          )}
                          {room.live && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          )}
                        </div>

                        <div>
                          <span className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                            {room.name}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-xs font-medium px-2 py-1 rounded-lg ${
                                isActive
                                  ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                  : isFull
                                    ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                    : "bg-slate-500/20 text-slate-300 border border-slate-500/30"
                              }`}
                            >
                              {isFull ? "Full" : isActive ? "Active" : "Offline"}
                            </span>
                            <div className="flex items-center gap-1 text-slate-400">
                              <Users className="w-3 h-3" />
                              <span className="text-xs">
                                {room.members}/{room.capacity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                          isFull
                            ? "bg-slate-600/50 text-slate-400 cursor-not-allowed"
                            : "bg-white hover:bg-black hover:text-white text-black shadow-lg hover:shadow-white/35"
                        }`}
                        disabled={isFull}
                      >
                        {isFull ? "Full" : "Join"}
                      </button>
                    </div>
                  </div>
                )
              })}

              {filteredRooms.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <p>No rooms found matching your search.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 pt-4 border-t border-slate-700/50 flex-shrink-0">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Total: {filteredRooms.length} rooms</span>
                <span>Online: {filteredRooms.filter((r) => r.live).length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeRoom
