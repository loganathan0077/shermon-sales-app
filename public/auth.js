// ============================================================
// auth.js - Offline Version
// Completely replaces Firebase with local storage logic.
// ============================================================

export function updateSyncStatus(status, message) {
    const statusEl = document.getElementById('sync-status');
    const iconEl = document.getElementById('sync-icon');
    const textEl = document.getElementById('sync-text');

    if (!statusEl || !iconEl || !textEl) return;

    iconEl.innerText = '💾';
    textEl.innerText = 'Saved Locally';
    statusEl.style.background = 'rgba(241,196,15,0.3)';
    statusEl.style.borderColor = 'rgba(241,196,15,0.6)';
}

export async function login(email, password, force = false) {
    if (email === "admin@example.com" && password === "Admin@2026") {
        sessionStorage.setItem('offline_user', email);
        return { success: true, user: { email: email, uid: "offline_admin" } };
    }
    if (email === "user@example.com" && password === "User@123") {
        sessionStorage.setItem('offline_user', email);
        return { success: true, user: { email: email, uid: "offline_user" } };
    }
    return { success: false, error: "Incorrect username or password." };
}

export async function logout() {
    sessionStorage.removeItem('offline_user');
    return { success: true };
}

export function checkAuth(redirectToLogin = true) {
    return new Promise((resolve) => {
        const userEmail = sessionStorage.getItem('offline_user');
        if (userEmail) {
            resolve({ email: userEmail, uid: "offline_admin" });
        } else {
            if (redirectToLogin && !window.location.pathname.includes('login.html') && window.location.pathname !== '/') {
                window.location.href = '/';
            }
            resolve(null);
        }
    });
}

export function getCurrentUser() {
    const userEmail = sessionStorage.getItem('offline_user');
    return userEmail ? { email: userEmail, uid: "offline_admin" } : null;
}

export async function saveBillToCloud(billItems) {
    if (!billItems || billItems.length === 0) {
        return { success: false, error: "Empty bill" };
    }

    try {
        let products = JSON.parse(localStorage.getItem('products') || '[]');
        let sales = JSON.parse(localStorage.getItem('sales') || '[]');

        const productMap = new Map(products.map(p => [String(p.id), { ...p }]));

        for (const item of billItems) {
            const product = productMap.get(String(item.productId));
            if (!product) {
                throw new Error(`Product not found: "${item.productName}".`);
            }
            const multiplier = item.baseQuantity || 1;
            const deduction = item.quantity * multiplier;
            product.stock = (parseFloat(product.stock) || 0) - deduction;
            productMap.set(String(item.productId), product);
        }

        products = Array.from(productMap.values());
        sales = [...sales, ...billItems];

        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('sales', JSON.stringify(sales));

        updateSyncStatus('offline', 'Sale Saved Locally');
        return { success: true };
    } catch (e) {
        console.error("❌ Bill save failed:", e);
        return { success: false, error: e.message };
    }
}

export async function savePurchaseToCloud(purchaseRecord) {
    if (!purchaseRecord || !purchaseRecord.items || purchaseRecord.items.length === 0) {
        return { success: false, error: "Empty purchase record" };
    }

    try {
        let products = JSON.parse(localStorage.getItem('products') || '[]');
        let purchases = JSON.parse(localStorage.getItem('purchases') || '[]');

        const productMap = new Map(products.map(p => [String(p.id), { ...p }]));

        purchaseRecord.items.forEach(item => {
            const product = productMap.get(String(item.productId));
            if (product) {
                product.stock = (parseFloat(product.stock) || 0) + (parseFloat(item.qty) || 0);
                if (item.price > 0) product.costPrice = parseFloat(item.price);
                if (item.sellingPrice > 0) product.price = parseFloat(item.sellingPrice);
                productMap.set(String(item.productId), product);
            }
        });

        products = Array.from(productMap.values());
        purchases = [...purchases, purchaseRecord];

        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('purchases', JSON.stringify(purchases));

        updateSyncStatus('offline', 'Purchase Saved Locally');
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
}

export async function loadUserDataFromFirestore(userId) {
    // Already in local storage, do nothing
    return { success: true };
}

export async function syncDataToFirestore(userId) {
    // Offline, so syncing is essentially saving locally which is already done
    return { success: true };
}

export function startRealtimeSync(userId, onDataUpdate) {
    // No real-time sync needed for fully offline app
    return () => {};
}

export function stopRealtimeSync() {}

export function suppressNextListenerUpdate(durationMs = 5000) {}

export function autoSync() {}

export async function isAdmin() {
    const userEmail = sessionStorage.getItem('offline_user');
    return userEmail === "admin@example.com";
}

export async function verifyAdmin(actionName) {
    return { success: true };
}

export async function establishSession(userId, email) {
    return { status: 'active' };
}

export async function recoverData() {
    alert('Data recovery is not applicable in offline mode. Data is saved locally.');
}

window.recoverData = recoverData;