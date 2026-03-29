export function ETFComparison() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 my-3">
      <h3 className="font-semibold text-lg mb-3 text-center">
        ETF-Vergleich
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left py-2 px-2">ETF</th>
              <th className="text-left py-2 px-2">Region</th>
              <th className="text-left py-2 px-2">
                Risikoklasse
              </th>
              <th className="text-left py-2 px-2">
                Rendite
                <span className="block text-s text-gray-400 font-normal">
                  (3 Jahre)
                </span>
              </th>
              <th className="text-left py-2 px-2">
                Kostenquote
              </th>
              <th className="text-left py-2 px-2">Branchen</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 bg-violet-50">
              <td className="py-3 px-2">
                <div className="font-semibold">ETF A</div>
                <div className="text-s text-gray-600">
                  Alpha Global
                </div>
              </td>
              <td className="py-3 px-2">Weltweit</td>
              <td className="py-3 px-2">
                <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-s">
                  Mittel
                </span>
              </td>
              <td className="py-3 px-2 font-semibold text-green-700">
                5,2% p.a.
              </td>
              <td className="py-3 px-2">0,3%</td>
              <td className="py-3 px-2 text-s">
                Technologie, Konsum, Energie
              </td>
            </tr>
            <tr className="bg-violet-50">
              <td className="py-3 px-2">
                <div className="font-semibold">ETF B</div>
                <div className="text-xs text-gray-600">
                  Beta Nachhaltig
                </div>
              </td>
              <td className="py-3 px-2">Europa</td>
              <td className="py-3 px-2">
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-s">
                  Niedrig
                </span>
              </td>
              <td className="py-3 px-2 font-semibold text-green-700">
                3,1% p.a.
              </td>
              <td className="py-3 px-2">0,2%</td>
              <td className="py-3 px-2 text-s">
                Gesundheit, Umwelt, Energie
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}