import { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Booking {
  id: number
  date: Date
  roomNumber: string
  guestName: string
}

const initialBookings: Booking[] = [
  { id: 1, date: new Date(2023, 5, 15), roomNumber: "101", guestName: "Juan Pérez" },
  { id: 2, date: new Date(2023, 5, 20), roomNumber: "202", guestName: "María García" },
  { id: 3, date: new Date(2023, 6, 5), roomNumber: "303", guestName: "Carlos Rodríguez" },
]

export function BookingCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)

  const bookingsForSelectedDate = bookings.filter(
    booking => booking.date.toDateString() === date?.toDateString()
  )

  const addBooking = (newBooking: Omit<Booking, 'id'>) => {
    setBookings([...bookings, { ...newBooking, id: bookings.length + 1 }])
  }

  return (
    <Card className="col-span-full lg:col-span-1 lg:row-span-2">
      <CardHeader>
        <CardTitle>Calendario de Reservas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border w-full sm:w-auto"
          />
          <ScrollArea className="h-[350px] w-full sm:w-[300px] rounded-md border">
            <div className="p-4">
              <h3 className="font-semibold mb-2">Reservas para {date?.toLocaleDateString()}</h3>
              {bookingsForSelectedDate.length === 0 ? (
                <p>No hay reservas para esta fecha.</p>
              ) : (
                <ul className="space-y-2">
                  {bookingsForSelectedDate.map(booking => (
                    <li key={booking.id} className="bg-muted p-2 rounded-md">
                      <p><strong>Habitación:</strong> {booking.roomNumber}</p>
                      <p><strong>Huésped:</strong> {booking.guestName}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </ScrollArea>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">Nueva Reserva</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agregar Nueva Reserva</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              addBooking({
                date: new Date(formData.get('date') as string),
                roomNumber: formData.get('roomNumber') as string,
                guestName: formData.get('guestName') as string,
              })
            }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha</Label>
                <Input id="date" name="date" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomNumber">Número de Habitación</Label>
                <Select name="roomNumber" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar habitación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="101">101</SelectItem>
                    <SelectItem value="202">202</SelectItem>
                    <SelectItem value="303">303</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="guestName">Nombre del Huésped</Label>
                <Input id="guestName" name="guestName" required />
              </div>
              <Button type="submit" className="w-full">Agregar Reserva</Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

