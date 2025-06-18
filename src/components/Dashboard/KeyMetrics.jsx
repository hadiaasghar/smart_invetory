import React, { useState, useEffect } from "react";

const KeyMetrics = () => {
  const [metrics, setMetrics] = useState({
    salesThisMonth: 0,
    topSellingProduct: "",
    predictedDemand: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/metrics");
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow h-60 text-black cursor-pointer hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-start mb-4">Key Metrics</h2>

      <div className="space-y-3">
        <div className="flex gap-2  pb-1">
          <span className="font-semibold">Sales This Month:</span>
          <span>${metrics.salesThisMonth}</span>
        </div>
        <div className="flex gap-2  pb-1">
          <span className="font-semibold">Top-Selling Product:</span>
          <span>{metrics.topSellingProduct}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Predicted Demand:</span>
          <span>+{metrics.predictedDemand}%</span>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;
