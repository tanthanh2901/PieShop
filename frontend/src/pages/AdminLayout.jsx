import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useLocation, Outlet } from "react-router-dom";
import { UserInfoContext } from "../context/UserInfoContext";
import ModalComponent from "../components/ModalComponent";

const AdminLayout = () => {
  const location = useLocation(); // Get the current route to highlight the active tab
  const [open, setOpen] = useState(false)

  const { handleLogout } = useContext(UserInfoContext);

  return (
    <div className="bg-gray-50 w-full h-screen flex flex-col">
    {/* Header */}
    <div className="flex items-center py-2 px-[4%] justify-between border-b border-gray-300">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-24 sm:w-28 ml-4" />
      </Link>
      <button onClick={() => {setOpen(true)}} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm mr-4">
        Logout
      </button>
      <ModalComponent 
        open={open} 
        onClose={() => setOpen(false)}
        modal={{
          message:"are u sure", 
          handle: handleLogout}
        }                 
      />
    </div>
  
    {/* Content Area */}
    <div className="flex flex-1 w-full">
      {/* Sidebar */}
      <aside className="w-[18%] min-h-screen border-r-2">
        <nav>
          <ul className="flex flex-col gap-2 pt-6 px-4">
            {/* Dashboard Tab */}
            <li>
              <Link
                to="/admin"
                className={`cursor-pointer px-4 py-2 flex items-center gap-3 border border-gray-300 rounded-l w-full text-left ${
                  location.pathname === "/admin" ? "bg-pink-100 font-bold" : ""
                }`}
              >
                Dashboard
              </Link>
            </li>
            {/* Add Product Management Tab */}
            <li>
              <Link
                to="/admin/addProduct"
                className={`cursor-pointer px-4 py-2 flex items-center gap-3 border border-gray-300 rounded-l w-full text-left ${
                  location.pathname === "/admin/addProduct"
                    ? "bg-pink-100 font-bold"
                    : ""
                }`}
              >
                Add Product
              </Link>
            </li>
            {/* Product Management Tab */}
            <li>
              <Link
                to="/admin/products"
                className={`cursor-pointer px-4 py-2 flex items-center gap-3 border border-gray-300 rounded-l w-full text-left ${
                  location.pathname === "/admin/products"
                    ? "bg-pink-100 font-bold"
                    : ""
                }`}
              >
                Products
              </Link>
            </li>
            {/* Category Management Tab */}
            <li>
              <Link
                to="/admin/categories"
                className={`cursor-pointer px-4 py-2 flex items-center gap-3 border border-gray-300 rounded-l w-full text-left ${
                  location.pathname === "/admin/categories"
                    ? "bg-pink-100 font-bold"
                    : ""
                }`}
              >
                Categories
              </Link>
            </li>
            {/* Order Management Tab */}
            <li>
              <Link
                to="/admin/orders"
                className={`cursor-pointer px-4 py-2 flex items-center gap-3 border border-gray-300 rounded-l w-full text-left ${
                  location.pathname === "/admin/orders"
                    ? "bg-pink-100 font-bold"
                    : ""
                }`}
              >
                Orders
              </Link>
            </li>
            {/* User Management Tab */}
            <li>
              <Link
                to="/admin/userManagement"
                className={`cursor-pointer px-4 py-2 flex items-center gap-3 border border-gray-300 rounded-l w-full text-left ${
                  location.pathname === "/admin/userManagement"
                    ? "bg-pink-100 font-bold"
                    : ""
                }`}
              >
                User Management
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
  
      {/* Main Content */}
      <main className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
        <Outlet />
      </main>
    </div>

    <ModalComponent 
      open={open} 
      onClose={() => setOpen(false)}
      modal={{
        message:"are u sure", 
        handleConfirm: handleLogout}
      }
      
    />
  </div>
  );
};

export default AdminLayout;
