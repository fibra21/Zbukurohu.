import { Input } from '../../ui/input'

export function CustomersPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-2">
        <Input placeholder="Kërko emër" />
        <Input placeholder="Filtri: min. porosi" />
      </div>
      <div className="rounded-lg border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr>
              <th className="py-2 px-3">Emri</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Telefoni</th>
              <th className="py-2 px-3">Tot. Porosi</th>
              <th className="py-2 px-3">Tot. Shpenzuar</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 px-3">Klient {i+1}</td>
                <td className="py-2 px-3">klient{i+1}@shembull.com</td>
                <td className="py-2 px-3">+383 44 000 00{i}</td>
                <td className="py-2 px-3">{(i+1) * 2}</td>
                <td className="py-2 px-3">€{(120 + i*20).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

