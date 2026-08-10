import { cn } from '../../utils/cn'

const Table = ({ columns = [], data = [], emptyMessage = 'No records found.', className }) => (
  <div className={cn('overflow-hidden rounded-lg ring-1 ring-stone-200', className)}>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-stone-100 bg-surface">
        <thead className="bg-stone-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="whitespace-nowrap px-4 py-3 text-left text-xs font-black uppercase tracking-[0.16em] text-stone-500"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {data.length === 0 ? (
            <tr>
              <td className="px-4 py-10 text-center text-sm text-stone-500" colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={row.id || row._id || rowIndex} className="transition hover:bg-primary-light">
                {columns.map((column) => (
                  <td key={column.key} className="whitespace-nowrap px-4 py-3 text-sm text-stone-700">
                    {column.render ? column.render(row, rowIndex) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
)

export default Table
