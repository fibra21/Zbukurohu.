import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../ui/chart'
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

const sales7 = [
  { day: 'Mon', sales: 1200 },
  { day: 'Tue', sales: 980 },
  { day: 'Wed', sales: 1340 },
  { day: 'Thu', sales: 900 },
  { day: 'Fri', sales: 1600 },
  { day: 'Sat', sales: 1800 },
  { day: 'Sun', sales: 1500 },
]

const monthly = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 14000 },
  { month: 'Mar', revenue: 9000 },
  { month: 'Apr', revenue: 18000 },
  { month: 'May', revenue: 22000 },
  { month: 'Jun', revenue: 19500 },
]

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Sales Today', value: '€1,920' },
          { label: 'Total Revenue', value: '€24,300' },
          { label: 'Orders Count', value: '124' },
          { label: 'Profit', value: '€6,450' },
        ].map((card) => (
          <div key={card.label} className="rounded-lg border p-4">
            <div className="text-sm text-muted-foreground">{card.label}</div>
            <div className="text-2xl font-semibold">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <div className="mb-2 font-medium">Sales last 7 days</div>
          <ChartContainer config={{ sales: { label: 'Sales', color: 'hsl(var(--primary))' } }}>
            <LineChart data={sales7}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} />
              <ChartTooltip content={<ChartTooltipContent />} />
            </LineChart>
          </ChartContainer>
        </div>
        <div className="rounded-lg border p-4">
          <div className="mb-2 font-medium">Monthly revenue</div>
          <ChartContainer config={{ revenue: { label: 'Revenue', color: 'hsl(var(--primary))' } }}>
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4,4,0,0]} />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-lg border">
          <div className="p-4 border-b font-medium">Recent Orders</div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-muted-foreground">
                <tr>
                  <th className="py-2">Order ID</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Date</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2">#ORD-{1000 + i}</td>
                    <td className="py-2">Arta Krasniqi</td>
                    <td className="py-2">2025-08-0{i+1}</td>
                    <td className="py-2">€{(50 + i * 12).toFixed(2)}</td>
                    <td className="py-2"><span className="px-2 py-0.5 rounded bg-secondary">Paid</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-lg border">
          <div className="p-4 border-b font-medium">Top Selling Products</div>
          <ul className="p-4 space-y-3 text-sm">
            {['Parfum', 'Serum', 'Lips'].map((p, i) => (
              <li key={p} className="flex justify-between">
                <span>{p}</span>
                <span className="text-muted-foreground">{(250 - i*30)} sold</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

