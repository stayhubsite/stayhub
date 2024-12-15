import { useState } from "react"
import { BedDouble, Users, Wifi, Tv, Coffee, MessageSquare } from 'lucide-react'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface RoomDetailsProps {
  room: {
    id: number
    number: string
    type: string
    status: "disponible" | "ocupada" | "limpieza"
    capacity: number
    amenities: string[]
    price: number
    comment?: string
  }
  onStatusChange: (id: number, status: "disponible" | "ocupada" | "limpieza") => void
  onCommentChange: (id: number, comment: string) => void
}

export function RoomDetails({ room, onStatusChange, onCommentChange }: RoomDetailsProps) {
  const [status, setStatus] = useState(room.status)
  const [comment, setComment] = useState(room.comment || "")

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "disponible": return "bg-green-500"
      case "ocupada": return "bg-red-500"
      case "limpieza": return "bg-yellow-500"
      default: return "bg-gray-500"
    }
  }

  const handleStatusChange = (newStatus: "disponible" | "ocupada" | "limpieza") => {
    setStatus(newStatus)
    onStatusChange(room.id, newStatus)
  }

  const handleCommentChange = (newComment: string) => {
    setComment(newComment)
    onCommentChange(room.id, newComment)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ver detalles</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detalles de la Habitación {room.number}</DialogTitle>
          <DialogDescription>
            Información detallada y gestión de la habitación
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <BedDouble className="h-5 w-5" />
            <span>{room.type}</span>
          </div>
          <div className="flex items-center gap-4">
            <Users className="h-5 w-5" />
            <span>Capacidad: {room.capacity} personas</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge className={getStatusColor(status)}>
              {status}
            </Badge>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Cambiar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disponible">Disponible</SelectItem>
                <SelectItem value="ocupada">Ocupada</SelectItem>
                <SelectItem value="limpieza">Limpieza</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Amenidades:</h4>
            <div className="flex gap-2">
              {room.amenities.includes('wifi') && <Wifi className="h-5 w-5" />}
              {room.amenities.includes('tv') && <Tv className="h-5 w-5" />}
              {room.amenities.includes('minibar') && <Coffee className="h-5 w-5" />}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">Precio por noche:</span>
            <span>${room.price}</span>
          </div>
          <div>
            <h4 className="mb-2 font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Comentario:
            </h4>
            <Textarea
              placeholder="Agregar un comentario sobre la habitación..."
              value={comment}
              onChange={(e) => handleCommentChange(e.target.value)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

