export function ETFComparison() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 my-3 animate-fade-in">
      <h3 className="font-semibold text-lg mb-3 text-center text-violet-700">
        ETF-Vergleich
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-center py-3 px-2 align-middle">ETF</th>
              <th className="text-center py-3 px-2 align-middle">Region</th>
              <th className="text-center py-3 px-2 align-middle">
                Risikoklasse
              </th>
              <th className="text-center py-3 px-2 align-middle">Rendite</th>
              <th className="text-center py-3 px-2 align-middle">
                Kostenquote
              </th>
              <th className="text-center py-3 px-2 align-middle">Branchen</th>
            </tr>
            <tr className="border-b border-gray-300">
              <th className="text-center py-1 px-2 text-xs text-gray-400 font-normal">
                &nbsp;
              </th>
              <th className="text-center py-1 px-2 text-xs text-gray-400 font-normal">
                &nbsp;
              </th>
              <th className="text-center py-1 px-2 text-xs text-gray-400 font-normal">
                &nbsp;
              </th>
              <th className="text-center py-1 px-2 text-xs text-gray-400 font-normal">
                (3 Jahre)
              </th>
              <th className="text-center py-1 px-2 text-xs text-gray-400 font-normal">
                &nbsp;
              </th>
              <th className="text-center py-1 px-2 text-xs text-gray-400 font-normal">
                &nbsp;
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 bg-violet-50">
              <td className="py-3 px-2 text-center align-middle">
                <div className="font-semibold">ETF A</div>
                <div className="text-s text-gray-600">
                  Alpha Global
                </div>
              </td>
              <td className="py-3 px-2 text-center align-middle">Weltweit</td>
              <td className="py-3 px-2 text-center align-middle">
                <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-s">
                  Mittel
                </span>
              </td>
              <td className="py-3 px-2 font-semibold text-green-700 text-center align-middle">
                5,2%
              </td>
              <td className="py-3 px-2 text-center align-middle">0,3%</td>
              <td className="py-3 px-2 text-center text-s align-middle">
                Technologie, Konsum, Energie
              </td>
            </tr>
            <tr className="bg-violet-50">
              <td className="py-3 px-2 text-center align-middle">
                <div className="font-semibold">ETF B</div>
                <div className="text-s text-gray-600">
                  Beta Nachhaltig
                </div>
              </td>
              <td className="py-3 px-2 text-center align-middle">Europa</td>
              <td className="py-3 px-2 text-center align-middle">
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-s">
                  Niedrig
                </span>
              </td>
              <td className="py-3 px-2 font-semibold text-green-700 text-center align-middle">
                3,1%
              </td>
              <td className="py-3 px-2 text-center align-middle">0,2%</td>
              <td className="py-3 px-2 text-center text-s align-middle">
                Gesundheit, Umwelt, Energie
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}