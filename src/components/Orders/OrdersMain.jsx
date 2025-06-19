
import { useState } from "react";
import OrderList from "./OrderList";
import OrderDetails from "./OrderDetails";
import CreateOrder from "./CreateOrder";

const OrdersMain = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Order Management</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order List */}
        <div className="flex flex-col lg:col-span-3">
          <OrderList onSelectOrder={setSelectedOrder} />
        </div>

        {/* Order Details and Create Order (Side by Side) */}
        <div className="lg:col-span-3 flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <OrderDetails order={selectedOrder} />
          </div>
          <div className="flex-1 ">
            <CreateOrder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersMain;


