// import { useState } from "react";
// import axios from "axios";

// import { RiDeleteBin2Fill } from "react-icons/ri";

// const CreateOrder = ({ onOrderCreated }) => {
//   const [supplier, setSupplier] = useState("");
//   const [total, setTotal] = useState("");
//   const [status, setStatus] = useState("Pending");
//   const [orderDate, setOrderDate] = useState("");
//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [items, setItems] = useState([{ name: "", quantity: "", price: "" }]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleAddItem = () => {
//     setItems([...items, { name: "", quantity: "", price: "" }]);
//   };

//   const handleRemoveItem = (index) => {
//     const newItems = items.filter((_, i) => i !== index);
//     setItems(newItems);
//   };

//   const handleItemChange = (index, field, value) => {
//     const newItems = [...items];
//     newItems[index][field] = value;
//     setItems(newItems);
//   };

//   const handleClearForm = () => {
//     setSupplier("");
//     setTotal("");
//     setStatus("Pending");
//     setOrderDate("");
//     setDeliveryDate("");
//     setItems([{ name: "", quantity: "", price: "" }]);
//     setError("");
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const orderData = {
//         supplier,
//         total: parseFloat(total),
//         status,
//         orderDate: orderDate || new Date().toISOString().split("T")[0],
//         deliveryDate: deliveryDate || null,
//         items: items.map((item) => ({
//           name: item.name,
//           quantity: parseInt(item.quantity),
//           price: parseFloat(item.price),
//         })),
//       };

//       const response = await axios.post(
//         "http://localhost:5000/api/orders",
//         orderData
//       );
//       console.log("Order Created:", response.data);
//       onOrderCreated();
//       handleClearForm();
//     } catch (err) {
//       console.error("Error Creating Order:", err);
//       setError("Failed to create order. Check console for details.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="bg-white h-[600px]  rounded p-4">
//       <h2 className="text-2xl font-bold mb-4">Create New Order</h2>

//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block font-medium">Supplier Name</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded-md"
//             placeholder="Enter supplier name"
//             value={supplier}
//             onChange={(e) => setSupplier(e.target.value)}
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Total Price</label>
//           <input
//             type="number"
//             className="w-full p-2 border rounded-md"
//             placeholder="Enter total price"
//             value={total}
//             onChange={(e) => setTotal(e.target.value)}
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Order Status</label>
//           <select
//             className="w-full p-2 border rounded-md"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <option value="Pending">Pending</option>
//             <option value="Completed">Completed</option>
//             <option value="Cancelled">Cancelled</option>
//           </select>
//         </div>

//         <div>
//           <label className="block font-medium">Order Date</label>
//           <input
//             type="date"
//             className="w-full p-2 border rounded-md"
//             value={orderDate}
//             onChange={(e) => setOrderDate(e.target.value)}
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Delivery Date</label>
//           <input
//             type="date"
//             className="w-full p-2 border rounded-md"
//             value={deliveryDate}
//             onChange={(e) => setDeliveryDate(e.target.value)}
//           />
//         </div>
//       </div>

//       <h3 className="font-semibold mt-6">Order Items</h3>
//       <div className="w-full space-y-4">
//         {items.map((item, index) => (
//           <div
//             key={index}
//             className="grid grid-cols-12 gap-4 items-center w-full"
//           >
//             <input
//               type="text"
//               className="col-span-4 p-2 border rounded-md w-full"
//               placeholder="Item Name"
//               value={item.name}
//               onChange={(e) => handleItemChange(index, "name", e.target.value)}
//             />
//             <input
//               type="number"
//               className="col-span-3 p-2 border rounded-md w-full"
//               placeholder="Quantity"
//               value={item.quantity}
//               onChange={(e) =>
//                 handleItemChange(index, "quantity", e.target.value)
//               }
//             />
           
//             <button
//               onClick={() => handleRemoveItem(index)}
//               className="col-span-2m rounded h-10 w-16 p-2 bg-red-500 hover:bg-red-700 transition flex justify-center"
//             >
//           <RiDeleteBin2Fill className="w-6 h-6  text-white " />
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-start mt-4">
//         <button onClick={handleAddItem} className="bg-gray-300 p-2 rounded-md">
//           + Add Item
//         </button>
//       </div>

//       <div className="flex justify-end space-x-4 mt-6">
//         <button
//           onClick={handleClearForm}
//           className="bg-gray-200 p-2 rounded-md"
//         >
//           Clear
//         </button>
//         <button
//           onClick={handleSubmit}
//           className="bg-blue-500 text-white p-2 rounded-md"
//           disabled={loading}
//         >
//           {loading ? "Creating..." : "Create Order"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateOrder;




import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { RiDeleteBin2Fill } from "react-icons/ri";

const CreateOrder = ({ onOrderCreated }) => {
  const [supplier, setSupplier] = useState("");
  const [status, setStatus] = useState("Pending");
  const [orderDate, setOrderDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: "", price: "" }]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch product list on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: "", price: "" }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleClearForm = () => {
    setSupplier("");
    setStatus("Pending");
    setOrderDate("");
    setDeliveryDate("");
    setItems([{ name: "", quantity: "", price: "" }]);
    setError("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const today = new Date().toISOString().split("T")[0];
    if (orderDate < today) {
      setError("Order date cannot be before today.");
      setLoading(false);
      return;
    }

    if (deliveryDate && deliveryDate <= orderDate) {
      setError("Delivery date must be after order date.");
      setLoading(false);
      return;
    }

    try {
      const orderData = {
        supplier,
        status,
        orderDate: orderDate || today,
        deliveryDate: deliveryDate || null,
        items: items.map((item) => ({
          name: item.name,
          quantity: parseInt(item.quantity),
          price: parseFloat(item.price),
        })),
      };

      const response = await axios.post("http://localhost:5000/api/orders", orderData);
      console.log("Order Created:", response.data);

      if (typeof onOrderCreated === "function") {
        onOrderCreated();
      }

      handleClearForm();
    } catch (err) {
      console.error("Error Creating Order:", err);
      setError("Failed to create order. Check console for details.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white h-[600px] rounded p-4 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Order</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Supplier Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Enter supplier name"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Order Status</label>
          <select
            className="w-full p-2 border rounded-md"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Order Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded-md"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Delivery Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded-md"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
        </div>
      </div>

      <h3 className="font-semibold mt-6">Order Items</h3>
      <div className="w-full space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-4 items-center w-full"
          >
            {/* Product dropdown */}
            <select
              className="col-span-4 p-2 border rounded-md w-full text-blue-500 hover:text-blue-700 transition"
              value={item.name}
              onChange={(e) => handleItemChange(index, "name", e.target.value)}
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product._id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              className="col-span-3 p-2 border rounded-md w-full"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
            />
            <input
              type="number"
              className="col-span-3 p-2 border rounded-md w-full"
              placeholder="Price"
              value={item.price}
              onChange={(e) =>
                handleItemChange(index, "price", e.target.value)
              }
            />
            <button
              onClick={() => handleRemoveItem(index)}
              className="col-span-2 rounded h-10 w-16 p-2 bg-red-500 hover:bg-red-700 transition flex justify-center"
            >
              <RiDeleteBin2Fill className="w-6 h-6 text-white" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-start mt-4">
        <button onClick={handleAddItem} className="bg-gray-300 p-2 rounded-md">
          + Add Item
        </button>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          onClick={handleClearForm}
          className="bg-gray-200 p-2 rounded-md"
        >
          Clear
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Order"}
        </button>
      </div>
    </div>
  );
};

CreateOrder.propTypes = {
  onOrderCreated: PropTypes.func,
};

export default CreateOrder;

