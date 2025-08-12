import { Input } from '../../ui/input'
import { Button } from '../../ui/button'

export function SalesPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-2">
        <Input type="date" className="md:w-44" />
        <Input type="date" className="md:w-44" />
        <Input placeholder="Kërko klient ose produkt" className="md:flex-1" />
        <Button variant="outline">Export CSV</Button>
      </div>
      <div className="rounded-lg border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr>
              <th className="py-2 px-3">Order ID</th>
              <th className="py-2 px-3">Customer</th>
              <th className="py-2 px-3">Product</th>
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">Amount</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 12 }).map((_, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 px-3">#ORD-{1100 + i}</td>
                <td className="py-2 px-3">Client {i+1}</td>
                <td className="py-2 px-3">Product {i+1}</td>
                <td className="py-2 px-3">2025-08-{(i%28)+1}</td>
                <td className="py-2 px-3">€{(40 + i * 5).toFixed(2)}</td>
                <td className="py-2 px-3">Paid</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

