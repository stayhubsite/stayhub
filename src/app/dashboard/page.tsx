// // app/dashboard/page.tsx
// import React from 'react';

// const DashboardPage: React.FC = () => {
//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Bienvenido al Dashboard</h2>
//       <p>Esta es una página protegida solo para usuarios autenticados.</p>
//       {/* Agrega más contenido aquí según tus necesidades */}
//     </div>
//   );
// };

// export default DashboardPage;
"use client";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { RoomOverview } from "@/components/room-overview";
import { HotelStats } from "@/components/hotel-stats";
import { FeaturedRooms } from "@/components/featured-rooms";
import { BookingCalendar } from "@/components/calendar";
import { RevenueAnalysis } from "@/components/revenue-analysis";

const featuredRooms = [
  {
    id: 1,
    number: "101",
    type: "Individual",
    status: "disponible",
    price: 100,
  },
  { id: 2, number: "102", type: "Doble", status: "ocupada", price: 150 },
  { id: 3, number: "103", type: "Suite", status: "limpieza", price: 250 },
];

const DashboardPage: React.FC = () => {
  return (
    <DashboardShell>
      <DashboardSidebar />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardHeader
          heading="Dashboard del Hotel"
          text="Gestiona las habitaciones y reservas de tu hotel"
        />
        <HotelStats />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="space-y-4">
            <RoomOverview />
            <FeaturedRooms rooms={featuredRooms} />
          </div>
          <div className="space-y-4">
            <BookingCalendar />
            <RevenueAnalysis />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default DashboardPage;
