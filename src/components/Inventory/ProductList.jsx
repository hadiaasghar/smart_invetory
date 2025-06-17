import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../Inventory/Model";

const ProductList = ({ onSelectProduct }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    quantity: 0,
    reorderLevel: 0,
    description: "",
    supplier: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteProductId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteProductId) return;
    try {
      await fetch(`http://localhost:5000/api/products/${deleteProductId}`, {
        method: "DELETE",
      });
      setProducts(
        products.filter((product) => product._id !== deleteProductId)
      );
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${selectedProduct._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedProduct),
        }
      );
      if (!response.ok) throw new Error("Failed to update product");
      fetchProducts();
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error("Failed to add product");
      fetchProducts();
      setAddModalOpen(false);
      setNewProduct({
        name: "",
        category: "",
        quantity: 0,
        reorderLevel: 0,
        description: "",
        supplier: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg h-auto p-4  overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 border rounded-lg mb-6"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4 transition"
        onClick={() => setAddModalOpen(true)}
      >
        Add New Product
      </button>
      <div className="overflow-y-auto md:max-h-[220px]">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Car Part Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Reorder Level</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2">{product.quantity}</td>
                <td className="border px-4 py-2">{product.reorderLevel}</td>
                <td className="border px-4 py-2">
                  <div className="flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(product);
                      }}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteConfirmation(product._id);
                      }}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <h3 className="text-xl font-bold ">Edit Product</h3>
        {selectedProduct && (
          <div className="space-y-4">
            {[
              "name",
              "category",
              "quantity",
              "reorderLevel",
              "description",
              "supplier",
            ].map((field, i) => (
              <div key={i}>
                <label className="block text-gray-700 capitalize mb-1">
                  {field}
                </label>
                {field === "description" ? (
                  <textarea
                    value={selectedProduct[field]}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        [field]: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                    placeholder={field}
                  />
                ) : (
                  <input
                    type={
                      ["quantity", "reorderLevel"].includes(field)
                        ? "number"
                        : "text"
                    }
                    value={selectedProduct[field]}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        [field]: ["quantity", "reorderLevel"].includes(field)
                          ? parseInt(e.target.value)
                          : e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                    placeholder={field}
                  />
                )}
              </div>
            ))}
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        )}
      </Modal>

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)}>
        <div className="w-full">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Add New Product
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "name",
              "category",
              "quantity",
              "reorderLevel",
              "description",
              "supplier",
            ].map((field, i) => (
              <div key={i}>
                <label className="block text-gray-700 capitalize mb-1">
                  {field}
                </label>
                {field === "description" ? (
                  <textarea
                    value={newProduct[field]}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, [field]: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    placeholder={field}
                  />
                ) : (
                  <input
                    type={
                      ["quantity", "reorderLevel"].includes(field)
                        ? "number"
                        : "text"
                    }
                    value={newProduct[field]}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        [field]: ["quantity", "reorderLevel"].includes(field)
                          ? parseInt(e.target.value)
                          : e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                    placeholder={field}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <button
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
        <p className="mb-4">Are you sure you want to delete this product?</p>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={() => setDeleteModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;
