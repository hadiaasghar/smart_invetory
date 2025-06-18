import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TfiViewListAlt } from "react-icons/tfi";
import { MdDelete } from "react-icons/md";

const OrderList = ({ onSelectOrder }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showConfirm, setShowConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchOrders();
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;
    try {
      await fetch(`http://localhost:5000/api/orders/${orderToDelete}`, {
        method: "DELETE",
      });
      setShowConfirm(false);
      fetchOrders(); // Refresh orders list
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      filterStatus === "all" || order.status.toLowerCase() === filterStatus
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Order List</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <select
          className="border p-2 rounded w-full sm:w-auto"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="border px-3 py-2">Order ID</th>
                <th className="border px-3 py-2">Order Date</th>
                <th className="border px-3 py-2">Supplier</th>
                <th className="border px-3 py-2">Total</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2 break-all">{order._id}</td>
                  <td className="border px-3 py-2">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="border px-3 py-2">{order.supplier}</td>
                  <td className="border px-3 py-2">${order.total}</td>
                  <td className="border px-3 py-2">
                    <select
                      className="border p-1 rounded"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="border px-3 py-2 flex items-center gap-2">
                    <button
                      className="text-green-700 hover:text-green-500"
                      onClick={() => onSelectOrder(order)}
                    >
                      <TfiViewListAlt size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => {
                        setOrderToDelete(order._id);
                        setShowConfirm(true);
                      }}
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this order?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded mr-2"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteOrder}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ Add PropTypes validation here
OrderList.propTypes = {
  onSelectOrder: PropTypes.func.isRequired,
};

export default OrderList;
