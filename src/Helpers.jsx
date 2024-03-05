export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

export function transactionTotal(transactionInfo) {
    let total = 0;
    transactionInfo.forEach(transaction => {
        total += Number(transaction.amount);
    });
    return total;
}