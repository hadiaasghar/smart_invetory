import React, { useState, useEffect } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notifications");
        const data = await response.json();

        if (Array.isArray(data)) {
          setNotifications(data);
        } else {
          console.error("Invalid notifications data:", data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow text-black h-60 flex flex-col cursor-pointer hover:shadow-lg transition">
      <h2 className="text-lg font-bold text-start mb-2">Notifications</h2>
      <ul className="overflow-y-auto space-y-2 pr-2 flex-1">
        {notifications.length === 0 ? (
          <li>No notifications available</li>
        ) : (
          notifications.map((notification, index) => (
            <li key={index} className="border-b py-1 text-sm">
              {notification.message}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Notifications;
