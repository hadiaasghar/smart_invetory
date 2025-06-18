import PropTypes from "prop-types";

const OrderDetails = ({ order }) => {
  if (!order) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            No Order Selected
          </h2>
          <p className="text-gray-600">Select an order to view details.</p>
        </div>
      </div>
    );
  }

  const totalAmount = order.items?.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
        Order Details
      </h2>

      <div className="space-y-3 text-sm sm:text-base">
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>Supplier:</strong> {order.supplier}
        </p>
        <p>
          <strong>Total:</strong> ${totalAmount?.toFixed(2)}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {order.orderDate
            ? new Date(order.orderDate).toLocaleDateString()
            : ""}
        </p>
        <p>
          <strong>Delivery Date:</strong>{" "}
          {order.deliveryDate
            ? new Date(order.deliveryDate).toLocaleDateString()
            : ""}
        </p>
      </div>

      {order.items && order.items.length > 0 && (
        <>
          <h3 className="mt-6 text-md sm:text-lg font-bold text-gray-800">
            Order Items
          </h3>

          <div className="overflow-x-auto mt-4">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left text-gray-600 whitespace-nowrap">
                    Item
                  </th>
                  <th className="border px-4 py-2 text-left text-gray-600 whitespace-nowrap">
                    Quantity
                  </th>
                  <th className="border px-4 py-2 text-left text-gray-600 whitespace-nowrap">
                    Price
                  </th>
                  <th className="border px-4 py-2 text-left text-gray-600 whitespace-nowrap">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 whitespace-nowrap">
                      {item.productId.name}
                    </td>

                    <td className="border px-4 py-2 whitespace-nowrap">
                      {item.quantity}
                    </td>
                    <td className="border px-4 py-2 whitespace-nowrap">
                      ${item.price}
                    </td>
                    <td className="border px-4 py-2 whitespace-nowrap">
                      ${(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string,
    supplier: PropTypes.string,
    status: PropTypes.string,
    orderDate: PropTypes.string,
    deliveryDate: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        quantity: PropTypes.number,
        price: PropTypes.number,
      })
    ),
  }),
};

export default OrderDetails;
