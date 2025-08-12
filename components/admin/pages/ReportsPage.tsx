import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from '../../ui/chart'
import { Pie, PieChart, Cell, Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Button } from '../../ui/button'

const pieData = [
  { name: 'Makeup', value: 400 },
  { name: 'Skincare', value: 300 },
  { name: 'Hair', value: 300 },
  { name: 'Fragrance', value: 200 },
]

const barData = [
  { product: 'Parfum', revenue: 12000 },
  { product: 'Serum', revenue: 9000 },
  { product: 'Lips', revenue: 7000 },
]

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <div className="mb-2 font-medium">Sales by category</div>
          <ChartContainer config={{ a: { color: 'hsl(var(--primary))' } }}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} fill="var(--color-a)">
                {pieData.map((_, i) => (
                  <Cell key={i} fill={`hsl(var(--primary) / ${0.4 + i*0.15})`} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </div>
        <div className="rounded-lg border p-4">
          <div className="mb-2 font-medium">Top revenue products</div>
          <ChartContainer config={{ revenue: { color: 'hsl(var(--primary))' } }}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4,4,0,0]} />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
      <Button variant="outline">Download Report</Button>
    </div>
  )
}

