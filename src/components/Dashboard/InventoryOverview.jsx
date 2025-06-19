import { useEffect, useState } from "react";
import axios from "axios";

const InventoryOverview = () => {
  const [inventoryData, setInventoryData] = useState({
    totalStock: 0,
    lowStock: 0,
    outOfStock: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        const data = response.data;

        const totalStock = data.length;
        const lowStock = data.filter(
          (item) => item.stock > 0 && item.stock < 5
        ).length;
        const outOfStock = data.filter((item) => item.stock === 0).length;

        setInventoryData({ totalStock, lowStock, outOfStock });
      } catch (err) {
        setError("Failed to load inventory data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow h-60 cursor-pointer hover:shadow-lg transition">
      <h2 className="text-xl font-bold  text-start mb-4">Inventory Overview</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2   pb-1">
            <span className="font-semibold">Total Stock:</span>
            <span> {inventoryData.totalStock} items</span>
          </div>
          <div className="flex gap-2  pb-1">
            <span className="font-semibold">Low Stock:</span>
            <span>{inventoryData.lowStock} items</span>
          </div>
          <div className="flex gap-2  ">
            <span className="font-semibold">Out of Stock:</span>
            <span className="">{inventoryData.outOfStock} items</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryOverview;
