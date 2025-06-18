import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import TaskReminder from "./pages/TaskReminder";
import Suppliers from "./pages/Suppliers";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute><Dashboard /></PrivateRoute>
              
         
          }
        />
        <Route
          path="/inventory"
          element={
         <PrivateRoute><Inventory /></PrivateRoute> 
             
           
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>   <Orders />
         </PrivateRoute>
           
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>  <TaskReminder /></PrivateRoute>
        
            
          
          }
        />
        <Route
          path="/suppliers"
          element={
           <PrivateRoute>
              <Suppliers />
              </PrivateRoute>
         
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
