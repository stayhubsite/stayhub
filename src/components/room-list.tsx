"use client"

import { useState, useMemo } from "react"
import { BedDouble, Search } from 'lucide-react'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { RoomDetails } from "@/components/room-details"

type RoomStatus = "disponible" | "ocupada" | "limpieza"

interface Room {
  id: number
  number: string
  type: string
  status: RoomStatus
  capacity: number
  amenities: string[]
  price: number
  comment?: string
}

const initialRooms: Room[] = [
  { id: 1, number: "101", type: "Individual", status: "disponible", capacity: 1, amenities: ["wifi", "tv"], price: 100 },
  { id: 2, number: "102", type: "Doble", status: "ocupada", capacity: 2, amenities: ["wifi", "tv", "minibar"], price: 150 },
  { id: 3, number: "103", type: "Suite", status: "limpieza", capacity: 4, amenities: ["wifi", "tv", "minibar"], price: 250 },
  { id: 4, number: "201", type: "Individual", status: "disponible", capacity: 1, amenities: ["wifi", "tv"], price: 100 },
  { id: 5, number: "202", type: "Doble", status: "disponible", capacity: 2, amenities: ["wifi", "tv", "minibar"], price: 150 },
  { id: 6, number: "203", type: "Suite", status: "ocupada", capacity: 4, amenities: ["wifi", "tv", "minibar"], price: 250 },
]

export function RoomList() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms)
  const [statusFilter, setStatusFilter] = useState<RoomStatus | "todas">("todas")
  const [searchTerm, setSearchTerm] = useState("")

  const handleStatusChange = (roomId: number, newStatus: RoomStatus) => {
    setRooms(rooms.map(room => 
      room.id === roomId ? { ...room, status: newStatus } : room
    ))
  }

  const handleCommentChange = (roomId: number, newComment: string) => {
    setRooms(rooms.map(room => 
      room.id === roomId ? { ...room, comment: newComment } : room
    ))
  }

  const getStatusColor = (status: RoomStatus): string => {
    switch (status) {
      case "disponible": return "bg-green-500"
      case "ocupada": return "bg-red-500"
      case "limpieza": return "bg-yellow-500"
      default: return "bg-gray-500"
    }
  }

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => 
      (statusFilter === "todas" || room.status === statusFilter) &&
      (room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
       room.type.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }, [rooms, statusFilter, searchTerm])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <Input
          placeholder="Buscar habitación..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as RoomStatus | "todas")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas</SelectItem>
            <SelectItem value="disponible">Disponible</SelectItem>
            <SelectItem value="ocupada">Ocupada</SelectItem>
            <SelectItem value="limpieza">Limpieza</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRooms.map((room) => (
          <Card key={room.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Habitación {room.number}
              </CardTitle>
              <BedDouble className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <CardDescription>{room.type}</CardDescription>
                <Badge className={getStatusColor(room.status)}>
                  {room.status}
                </Badge>
              </div>
              <div className="mt-4">
                <RoomDetails 
                  room={room} 
                  onStatusChange={handleStatusChange}
                  onCommentChange={handleCommentChange}
                />
              </div>
              {room.comment && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Comentario: {room.comment}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

