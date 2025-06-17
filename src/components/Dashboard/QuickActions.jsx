import React, { useState } from "react";
import { FaPlus, FaBoxes, FaShoppingCart } from "react-icons/fa";
import Modal from "./Model";
import ProductList from "../Inventory/ProductList";
import CreateOrder from "../Orders/CreateOrder";

const QuickActions = () => {
  const [isAddProductOpen, setAddProductOpen] = useState(false);
  const [isViewInventoryOpen, setViewInventoryOpen] = useState(false);
  const [isCreateOrderOpen, setCreateOrderOpen] = useState(false);

  return (
    <>
      <div className="bg-white p-6 rounded shadow text-black">
        <h2 className="text-xl font-bold text-start mb-4">Quick Actions</h2>
        <div className="flex flex-col gap-2">
          <button
            className="w-full bg-blue-600 p-2 font-medium hover:bg-blue-400 rounded text-white flex items-center justify-center gap-2"
            onClick={() => setAddProductOpen(true)}
          >
            <FaPlus /> Add New Product
          </button>
          <button
            className="w-full bg-green-600 p-2 font-medium hover:bg-green-400 rounded text-white flex items-center justify-center gap-2"
            onClick={() => setViewInventoryOpen(true)}
          >
            <FaBoxes /> View Inventory
          </button>
          <button
            className="w-full bg-purple-600 p-2 font-medium hover:bg-purple-400 rounded text-white flex items-center justify-center gap-2"
            onClick={() => setCreateOrderOpen(true)}
          >
            <FaShoppingCart /> Create New Order
          </button>
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal isOpen={isAddProductOpen} onClose={() => setAddProductOpen(false)}>
        <div className="md:w-[600px] p-6">
          <h3 className="text-xl font-bold mb-4">Add New Product</h3>
          <ProductList onSelectProduct={() => {}} />
        </div>
      </Modal>

      {/* View Inventory Modal */}
      <Modal
        isOpen={isViewInventoryOpen}
        onClose={() => setViewInventoryOpen(false)}
      >
      
        <div className="md:w-[600px] p-6">
          <h3 className="text-xl font-bold mb-4">Inventory</h3>
          <ProductList onSelectProduct={() => {}} />
        </div>
      </Modal>
      

      {/* Create Order Modal */}
      <Modal
        isOpen={isCreateOrderOpen}
        onClose={() => setCreateOrderOpen(false)}
      >
        <div className="p-6">
          <CreateOrder onOrderCreated={() => setCreateOrderOpen(false)} />
        </div>
      </Modal>
    </>
  );
};

export default QuickActions;
