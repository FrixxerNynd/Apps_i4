<<<<<<< HEAD
import Register from "./Register"; 
import 'antd/dist/reset.css'; // para Ant Design v5+
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Dashboard from "./modules/dashboard/Dashboard";
import routes from "./core/menuRoutes";
import { useState } from "react";


function App() {
  const [ count, setCount ] = useState(0);
  const increment = () => setCount(count + 1);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            {routes.map( route => 
              <Route 
                key={route.path} 
                path={route.path} 
                element={route.element} />
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./modules/dashboard/Dashboard";
import routes from "./core/menuRoutes";
import AuthRoutes from "./auth/AuthRoutes";
import Login from "./pages/Login";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AuthRoutes><Dashboard /></AuthRoutes>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          {routes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </Router>
>>>>>>> 9fb3c1d (Commit Actualizacion frontend)
  );
}

export default App;
