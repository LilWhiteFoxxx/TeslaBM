export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export function formatDate2(date) {
    if (!(date instanceof Date)) {
        throw new Error('Input must be a Date object.');
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
}

export function getPriceRange(products) {
    if (products.length === 0) return null;

    const prices = products.map(p => p.salePrice);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    if (products.length === 1) {
        return minPrice;
    } else if (minPrice === maxPrice) {
        return minPrice;
    } else {
        return {
            minPrice,
            maxPrice
        };
    }
}
