
// Global function to reload data from LocalStorage (invoked by Realtime Sync)
window.reloadAppData = function () {
    console.log('🔄 Reloading App Data from Storage...');
    products = JSON.parse(localStorage.getItem('products')) || [];
    sales = JSON.parse(localStorage.getItem('sales')) || [];
    stockHistory = JSON.parse(localStorage.getItem('stockHistory')) || [];
    purchaseOrders = JSON.parse(localStorage.getItem('purchaseOrders')) || [];
    draftSales = JSON.parse(localStorage.getItem('draftSales')) || [];
    purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    negativeChangeCount = parseInt(localStorage.getItem('negativeChangeCount')) || 0;

    // Refresh dependent UI
    if (typeof updateDashboard === 'function') updateDashboard();
    if (typeof updateInventoryTable === 'function') updateInventoryTable();
    if (typeof updateTodaysSales === 'function') updateTodaysSales(); // Updates daily sales list
    if (typeof populateProductSelect === 'function') {
        populateProductSelect('updateStockProduct');
        populateSaleProductSelect();
    }
};
