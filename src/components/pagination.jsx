
function getPaginationItems(currentPage, totalPages) {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
        return [1, 2, 3, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
        return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
    ];
}

export default function Pagination({
    page,
    totalPages,
    onPageChange,
    loading = false,
}) {
    if (totalPages <= 1) return null;

    const paginationItems = getPaginationItems(page, totalPages);

    return (
        <div className="flex justify-center items-center gap-2 mt-6">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1 || loading}
                className="px-3 py-2 rounded-lg text-sm text-primary font-semibold disabled:text-gray-300"
            >
                Prev
            </button>

            {paginationItems.map((item, index) => {
                if (item === "...") {
                    return (
                        <span
                            key={`ellipsis-${index}`}
                            className="px-1"
                        >
                            …
                        </span>
                    );
                }

                return (
                    <button
                        key={item}
                        onClick={() => onPageChange(item)}
                        disabled={loading}
                        aria-current={page === item ? "page" : undefined}
                        className={`w-8 h-8 rounded-lg text-sm ${
                            page === item
                                ? "bg-primary text-white font-bold"
                                : "bg-gray-200 text-gray-500 font-bold"
                        }`}
                    >
                        {item}
                    </button>
                );
            })}

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages || loading}
                className="px-3 py-2 rounded-lg text-sm text-primary font-semibold disabled:text-gray-300"
            >
                Next
            </button>
        </div>
    );
}
