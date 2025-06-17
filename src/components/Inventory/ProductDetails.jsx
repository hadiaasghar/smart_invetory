const ProductDetails = ({ product }) => {
  if (!product) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">No Product Selected</h2>
          <p className="text-gray-600">Select a product to view details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h2>

      <div className="space-y-4 text-gray-700">
        <p><strong>Name:</strong> {product.name}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Supplier:</strong> {product.supplier}</p>
        <p><strong>Reorder Level:</strong> {product.reorderLevel}</p>
      </div>

      {product.stockHistory && product.stockHistory.length > 0 && (
        <>
          <h3 className="mt-6 text-lg font-bold text-gray-800">Stock History</h3>
          <table className="min-w-full mt-4 border-collapse text-sm">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left text-gray-600">Date</th>
                <th className="border px-4 py-2 text-left text-gray-600">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {product.stockHistory.map((entry, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{entry.date}</td>
                  <td className="border px-4 py-2">{entry.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
