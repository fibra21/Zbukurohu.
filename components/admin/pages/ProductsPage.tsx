import { Button } from '../../ui/button'
// import { ImageWithFallback } from '../../figma/ImageWithFallback'

export function ProductsPage() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button>Shto Produkt</Button>
        <Button variant="outline">Ndrysho</Button>
        <Button variant="outline">Fshi</Button>
      </div>
      <div className="rounded-lg border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr>
              <th className="py-2 px-3">Produkt</th>
              <th className="py-2 px-3">Çmimi</th>
              <th className="py-2 px-3">Stoku</th>
              <th className="py-2 px-3">Kategoria</th>
              <th className="py-2 px-3">Statusi</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 px-3 flex items-center gap-2">
                  <div className="w-10 h-10 rounded bg-muted" />
                  Produkt {i+1}
                </td>
                <td className="py-2 px-3">€{(19.99 + i).toFixed(2)}</td>
                <td className="py-2 px-3">{100 - i*3}</td>
                <td className="py-2 px-3">Makeup</td>
                <td className="py-2 px-3">Aktiv</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

