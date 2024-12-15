import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { RoomList } from "@/components/room-list";

export default function RoomsPage() {
  return (
    <DashboardShell>
      <DashboardSidebar />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DashboardHeader
          heading="Habitaciones"
          text="Gestiona el estado de las habitaciones del hotel"
        />
        <RoomList />
      </div>
    </DashboardShell>
  );
}
