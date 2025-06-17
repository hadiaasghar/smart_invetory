const Modal = ({
  isOpen,
  onClose,
  children,
  width = "w-96",
  height = "max-h-[90vh]",
  scrollable = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div
        className={`relative bg-white p-6 rounded-lg shadow-lg ${width} ${height} ${
          scrollable ? "overflow-y-auto" : ""
        }`}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
          aria-label="Close Modal"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
