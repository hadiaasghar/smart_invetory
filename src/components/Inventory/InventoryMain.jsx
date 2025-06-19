import { useState } from "react";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import DemandForecasting from "./DemandForecasting";

const InventoryMain = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-white  mb-6">
        Inventory Management
      </h1>

      {/* Grid for different sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product List */}
        <div className="flex flex-col lg:col-span-3">
          <ProductList onSelectProduct={setSelectedProduct} />
        </div>

        {/* Product Details and Demand Forecasting */}
        <div className="lg:col-span-3 flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <ProductDetails product={selectedProduct} />
          </div>
          <div className="flex-1">
            <DemandForecasting />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryMain;
