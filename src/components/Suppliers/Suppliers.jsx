import { useState, useEffect } from "react";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact: "",
    email: "",
  });

  const [editSupplier, setEditSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [emailError, setEmailError] = useState(false);
  const [contactError, setContactError] = useState(false);

  // Fetch suppliers from backend
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/suppliers");
        if (!response.ok) {
          throw new Error("Failed to fetch suppliers");
        }
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  // Handle input change for adding/updating a supplier
  // const handleChange = (e, isEditing = false) => {
  //   if (isEditing) {
  //     setEditSupplier({ ...editSupplier, [e.target.name]: e.target.value });
  //   } else {
  //     setNewSupplier({ ...newSupplier, [e.target.name]: e.target.value });
  //   }
    
  //     if (name === "email") {
  //       const isValidEmail = value.includes("@") && value.endsWith(".com");
  //       setEmailError(!isValidEmail);
  //     }
  // };
  const handleChange = (e, isEditing = false) => {
  const { name, value } = e.target;

  if (isEditing) {
    setEditSupplier({ ...editSupplier, [name]: value });
  } else {
    setNewSupplier({ ...newSupplier, [name]: value });

    if (name === "email") {
      const isValidEmail = value.includes("@") && value.endsWith(".com");
      setEmailError(!isValidEmail);
    }

    if (name === "contact") {
      const isValidContact = /^\d{8,}$/.test(value);
      setContactError(!isValidContact);
    }
  }
};


  // Add a new supplier
  const addSupplier = async () => {
     const isValidEmail =
      newSupplier.email.includes("@") && newSupplier.email.endsWith(".com");
        const isValidContact = /^\d{8,}$/.test(newSupplier.contact);
    setEmailError(!isValidEmail);
     setContactError(!isValidContact);
    if (!newSupplier.name || !newSupplier.contact || !newSupplier.email||!isValidEmail||!isValidContact) return;

    try {
      const response = await fetch("http://localhost:5000/api/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSupplier),
      });

      if (!response.ok) {
        throw new Error("Failed to add supplier");
      }

      const savedSupplier = await response.json();
      setSuppliers([...suppliers, savedSupplier]);
      setNewSupplier({ name: "", contact: "", email: "" });
    } catch (error) {
      setError(error.message);
    }
  };

  // Edit supplier - Open modal with existing details
  const openEditModal = (supplier) => {
    setEditSupplier(supplier);
  };

  // Save edited supplier
  const saveEditSupplier = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/suppliers/${editSupplier._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editSupplier),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update supplier");
      }

      setSuppliers(
        suppliers.map((s) => (s._id === editSupplier._id ? editSupplier : s))
      );
      setEditSupplier(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete a supplier
  const deleteSupplier = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/suppliers/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete supplier");
      }

      setSuppliers(suppliers.filter((supplier) => supplier._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold  mb-6">Suppliers</h1>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading State */}
      {loading ? (
        <p>Loading suppliers...</p>
      ) : (
        <>
          {/* Add New Supplier */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Add New Supplier</h2>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                name="name"
                value={newSupplier.name}
                onChange={(e) => handleChange(e)}
                placeholder="Supplier Name"
                className="p-2 border rounded-md"
              />
              {/* <input
                type="text"
                name="contact"
                value={newSupplier.contact}
                onChange={(e) => handleChange(e)}
                placeholder="Contact Person"
                className="p-2 border rounded-md"
              /> */}
              
            <input
  type="text"
  name="contact"
  value={newSupplier.contact}
  onChange={(e) => handleChange(e)}
  placeholder="Contact Person"
  className={`p-2 border rounded-md ${
    contactError ? "border-red-500" : "border-gray-300"
  }`}
/>
{contactError && (
  <p className="text-red-500 text-sm col-span-3">
    Contact must be at least 8 digits.
  </p>
)}

              <input
                type="email"
                name="email"
                value={newSupplier.email}
                onChange={(e) => handleChange(e)}
                placeholder="Email"
                className={`p-2 border rounded-md ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
              />
              {emailError && (
                <p className="text-red-500 text-sm">
  Please enter a valid email (must include &quot;@&quot; and end with &quot;.com&quot;)
</p>

              )}
              <button
                onClick={addSupplier}
                className="bg-blue-500 text-white px-4 py-2 rounded-md col-span-3"
              >
                Add Supplier
              </button>
            </div>
            
          </div>

          {/* Supplier List */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Supplier List</h2>
            <ul>
              {suppliers.map((supplier) => (
                <li
                  key={supplier._id}
                  className="border-b py-2 flex justify-between items-center"
                >
                  <div>
                    <div className="font-semibold">{supplier.name}</div>
                    <div className="text-gray-500 text-sm">
                      Contact: {supplier.contact} | Email: {supplier.email}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(supplier)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSupplier(supplier._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Edit Supplier Modal */}
      {editSupplier && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit Supplier</h2>
            <input
              type="text"
              name="name"
              value={editSupplier.name}
              onChange={(e) => handleChange(e, true)}
              placeholder="Supplier Name"
              className="w-full p-2 border rounded-md mb-2"
            />
            <input
              type="text"
              name="contact"
              value={editSupplier.contact}
              onChange={(e) => handleChange(e, true)}
              placeholder="Contact Person"
              className="w-full p-2 border rounded-md mb-2"
            />
            <input
              type="email"
              name="email"
              value={editSupplier.email}
              onChange={(e) => handleChange(e, true)}
              placeholder="Email"
              className="w-full p-2 border rounded-md mb-2"
            />
            <div className="flex gap-2">
              <button
                onClick={saveEditSupplier}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
              <button
                onClick={() => setEditSupplier(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;
