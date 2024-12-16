import { Notifications } from "@/components/notifications";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <span className="font-bold">Dashboard del Hotel</span>
          </div>
          <div className="flex-1 overflow-auto py-2">
            {children} {/* Usamos children directamente */}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <div className="flex-1" />
          <Notifications />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {children} {/* Usamos children directamente */}
        </main>
      </div>
    </div>
  );
}
