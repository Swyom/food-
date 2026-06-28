import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mock data fallback if Firestore collection is empty
const mockOrders = [
    { id: "ORD-001", customerName: "Eleanor Shellstrop", status: "Preparing", total: "185.00" },
    { id: "ORD-002", customerName: "Chidi Anagonye", status: "Completed", total: "45.50" },
    { id: "ORD-003", customerName: "Tahani Al-Jamil", status: "Completed", total: "450.00" }
];

async function fetchOrders() {
    const tbody = document.getElementById('orders-body');
    const activeOrdersCount = document.getElementById('active-orders-count');
    
    try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        let orders = [];
        
        querySnapshot.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() });
        });

        // Use mock data if database has no orders yet
        if (orders.length === 0) {
            orders = mockOrders;
        }

        activeOrdersCount.textContent = orders.length;
        renderOrders(orders, tbody);
        
    } catch (error) {
        console.error("Error fetching orders:", error);
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #ef4444;">Error loading data. Check console.</td></tr>`;
    }
}

function renderOrders(orders, tbody) {
    tbody.innerHTML = '';
    
    orders.forEach((order, index) => {
        const idDisplay = order.id.length > 10 ? order.id.substring(0, 6) : order.id;
        const status = order.status || 'Completed';
        const statusClass = status.toLowerCase() === 'completed' || status.toLowerCase() === 'delivered' 
            ? 'status-completed' 
            : 'status-pending';
            
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td class="order-id">#${idDisplay}</td>
            <td>${order.customerName || 'Guest User'}</td>
            <td><span class="status-badge ${statusClass}">${status}</span></td>
            <td>$${order.total || '0.00'}</td>
        `;
        
        tbody.appendChild(tr);
    });
}

// Load data when DOM is ready
document.addEventListener('DOMContentLoaded', fetchOrders);
