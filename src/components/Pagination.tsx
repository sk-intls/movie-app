interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: IPaginationProps) {
  const maxPages = Math.min(totalPages, 500);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (maxPages <= 7) {
      for (let i = 1; i <= maxPages; i++) {
        pages.push(i);
      }
      return pages;
    }
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (currentPage >=4 && currentPage <= totalPages - 3) {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    } else if (currentPage === totalPages - 1) {
      pages.push(1, "...", currentPage - 1, currentPage, totalPages);
    } else if (currentPage === totalPages) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, 2, 3, 4, "...", totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 
                   text-gray-700 dark:text-gray-300 border border-gray-300 
                   dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors"
      >
        Previous
      </button>

      <div className="flex gap-1">
        {pages.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-gray-500 dark:text-gray-400"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`px-4 py-2 rounded-lg transition-colors
                ${
                  currentPage === page
                    ? "bg-blue-500 text-lightgrey-500 font-semibold border border-black-700"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === maxPages}
        className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 
                   text-gray-700 dark:text-gray-300 border border-gray-300 
                   dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors"
      >
        Next
      </button>
    </div>
  );
}
