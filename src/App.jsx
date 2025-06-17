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
            
              <Dashboard />
         
          }
        />
        <Route
          path="/inventory"
          element={
          
              <Inventory />
           
          }
        />
        <Route
          path="/orders"
          element={
            
              <Orders />
         
          }
        />
        <Route
          path="/tasks"
          element={
        
              <TaskReminder />
          
          }
        />
        <Route
          path="/suppliers"
          element={
           
              <Suppliers />
         
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
