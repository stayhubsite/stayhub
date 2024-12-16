import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: "Ene", ingresos: 4000, gastos: 2400 },
  { month: "Feb", ingresos: 3000, gastos: 1398 },
  { month: "Mar", ingresos: 2000, gastos: 9800 },
  { month: "Abr", ingresos: 2780, gastos: 3908 },
  { month: "May", ingresos: 1890, gastos: 4800 },
  { month: "Jun", ingresos: 2390, gastos: 3800 },
];

export function RevenueAnalysis({ className, ...props }: { className?: string }) {
  const totalIngresos = data.reduce((sum, item) => sum + item.ingresos, 0);
  const totalGastos = data.reduce((sum, item) => sum + item.gastos, 0);
  const beneficioNeto = totalIngresos - totalGastos;

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Análisis de Ingresos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium">Ingresos Totales</p>
            <p className="text-2xl font-bold">${totalIngresos}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Gastos Totales</p>
            <p className="text-2xl font-bold">${totalGastos}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Beneficio Neto</p>
            <p className="text-2xl font-bold">${beneficioNeto}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
