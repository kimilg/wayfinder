
interface PaginationProps {
  readonly page: number,
  readonly totalPages: number,
  readonly onPageChange: (page: number) => void
}

export default function Pagination({page, totalPages, onPageChange}: PaginationProps) {
  const pageLimit = 5;
  let startPage = Math.floor(page / pageLimit) * pageLimit;
  let endPage = Math.min(startPage + pageLimit - 1, totalPages - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
      <div className="mt-4 flex justify-center items-center gap-2 text-sm">
        <button
            onClick={() => {
                startPage = Math.floor((page - 1) / pageLimit) * pageLimit;
                onPageChange(Math.max(0, startPage))
              }
            }
            disabled={page === 0}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          &laquo;
        </button>

        {pageNumbers.map((num) => (
            <button
                key={num}
                onClick={() => onPageChange(num)}
                className={`px-3 py-1 rounded ${
                    page === num
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 hover:bg-gray-300"
                }`}
            >
              {num + 1}
            </button>
        ))}

        <button
            onClick={() => {
              startPage = Math.floor((page + 1) / pageLimit) * pageLimit;
              endPage = Math.min(startPage + pageLimit - 1, totalPages - 1);
              onPageChange(Math.min(totalPages - 1, endPage))
            }}
            disabled={page === totalPages - 1}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          &raquo;
        </button>
      </div>
  );
}