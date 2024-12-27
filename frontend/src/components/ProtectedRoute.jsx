import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserInfoContext } from "../context/UserInfoContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(UserInfoContext);

  // Redirect to /login if the user is not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Render the children (protected content) if logged in
  return children;
};

export default ProtectedRoute;
