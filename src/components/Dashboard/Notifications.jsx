// import React, { useState, useEffect } from "react";
// import {
//   FaCheckCircle,
//   FaExclamationTriangle,
//   FaTimesCircle,
//   FaBell,
//   FaBoxOpen,
//   FaClock,
// } from "react-icons/fa";

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // Fetch notifications from the backend API
//     const fetchNotifications = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/notifications");
//         const data = await response.json();

//         // Ensure data is an array before updating state
//         if (Array.isArray(data)) {
//           setNotifications(data);
//         } else {
//           console.error("Invalid notifications data:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//       }
//     };

//     fetchNotifications();
//   }, []); // Empty array ensures this runs once when the component mounts

//   // Function to get icon and color based on notification type
//   const getNotificationStyle = (type) => {
//     switch (type) {
//       case "success":
//         return {
//           icon: <FaCheckCircle className="text-green-600 w-6 h-6 mr-2" />,
//           bgColor: "bg-green-100",
//           textColor: "text-green-600",
//         };
//       case "warning":
//         return {
//           icon: (
//             <FaExclamationTriangle className="text-yellow-600 w-6 h-6 mr-2" />
//           ),
//           bgColor: "bg-yellow-100",
//           textColor: "text-yellow-600",
//         };
//       case "error":
//         return {
//           icon: <FaTimesCircle className="text-red-600 w-6 h-6 mr-2" />,
//           bgColor: "bg-red-100",
//           textColor: "text-red-600",
//         };
//       case "lowStock":
//         return {
//           icon: <FaBoxOpen className="text-orange-600 w-6 h-6 mr-2" />,
//           bgColor: "bg-orange-100",
//           textColor: "text-orange-600",
//         };
//       case "delay":
//         return {
//           icon: <FaClock className="text-purple-600 w-6 h-6 mr-2" />,
//           bgColor: "bg-purple-100",
//           textColor: "text-purple-600",
//         };
//       default:
//         return {
//           icon: null,
//           bgColor: "bg-gray-100",
//           textColor: "text-gray-600",
//         };
//     }
//   };

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h2 className="text-xl font-bold mb-6 text-center flex items-center justify-center">
//         <FaBell className="text-blue-600 w-6 h-6 mr-2" />
//         Notifications
//       </h2>
//       <ul className="space-y-4 max-h-80 overflow-y-auto">
//         {notifications.length === 0 ? (
//           <li className="text-gray-600">No notifications available</li>
//         ) : (
//           notifications.map((notification, index) => {
//             const style = getNotificationStyle(notification.type);
//             return (
//               <li
//                 key={index}
//                 className={`flex items-center ${style.bgColor} ${style.textColor} rounded-lg p-4 shadow`}
//               >
//                 {style.icon}
//                 <span>{notification.message}</span>
//               </li>
//             );
//           })
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Notifications;




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
    <div className="bg-white p-4 rounded shadow text-black h-60 flex flex-col">
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
