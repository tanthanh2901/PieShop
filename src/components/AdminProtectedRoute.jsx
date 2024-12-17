import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserInfoContext } from "../context/UserInfoContext";

const AdminProtectedRoute = ({ children }) => {
  const { isLoggedIn, isAdmin } = useContext(UserInfoContext);

  if (!isLoggedIn) {
    // Redirect to login if the user is not logged in
    return <Navigate to="/login" replace />;
  }

  if (isLoggedIn && !isAdmin) {
    // Redirect to "Not Authorized" page if the user is not an admin
    return <Navigate to="/notfound" replace />;
  }

  // Render the protected content if the user is an admin
  return children;
};

export default AdminProtectedRoute;
