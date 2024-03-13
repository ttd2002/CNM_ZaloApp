import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import "./styles/style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const ProtectedRoute = ({ children }) => {
    return <Navigate to="/login" />;

    //return children;
  };
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/">
    //       <Route
    //         index
    //         element={
    //           <ProtectedRoute>
    //             <Home />
    //           </ProtectedRoute>
    //         }
    //       />
    //       <Route path="login" element={<Login />} />
    //       <Route path="register" element={<Register />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
    <Home />
  );
}

export default App;
