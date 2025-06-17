const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded shadow-lg p-4 w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              &times;
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  