const Tabs = ({ tabs, activeTab, setActiveTab }) => {
    return (
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`p-2 text-sm ${
              activeTab === index ? 'border-b-2 border-blue-500 font-bold' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  };
  
  export default Tabs;
  