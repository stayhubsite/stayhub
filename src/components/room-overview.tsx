"use client";

// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { name: "Ene", disponibles: 20, ocupadas: 35, limpieza: 5 },
  { name: "Feb", disponibles: 15, ocupadas: 40, limpieza: 5 },
  { name: "Mar", disponibles: 25, ocupadas: 30, limpieza: 5 },
  { name: "Abr", disponibles: 22, ocupadas: 33, limpieza: 5 },
  { name: "May", disponibles: 18, ocupadas: 37, limpieza: 5 },
  { name: "Jun", disponibles: 30, ocupadas: 25, limpieza: 5 },
];

export function RoomOverview() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Resumen de Habitaciones</CardTitle>
        <CardDescription>
          Estado de las habitaciones en los últimos 6 meses
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={50} />
            <Tooltip />
            <Legend />
            <Bar dataKey="disponibles" name="Disponibles" stackId="a" fill="#4ade80" />
            <Bar dataKey="ocupadas" name="Ocupadas" stackId="a" fill="#f87171" />
            <Bar dataKey="limpieza" name="En Limpieza" stackId="a" fill="#fbbf24" />
          </BarChart>
        </ResponsiveContainer> */}
      </CardContent>
    </Card>
  );
}
