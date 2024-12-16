import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Room {
  id: number
  number: string
  type: string
  status: "disponible" | "ocupada" | "limpieza"
  price: number
}

interface FeaturedRoomsProps {
  rooms: Room[]
}

export function FeaturedRooms({ rooms }: FeaturedRoomsProps) {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "disponible": return "bg-green-500"
      case "ocupada": return "bg-red-500"
      case "limpieza": return "bg-yellow-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Habitaciones Destacadas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <Card key={room.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Habitación {room.number}
                </CardTitle>
                <Badge className={getStatusColor(room.status)}>
                  {room.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <p>{room.type}</p>
                <p className="font-bold">${room.price}/noche</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

