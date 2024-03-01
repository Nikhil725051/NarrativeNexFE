import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/authSelector";
import { logOut } from "../../redux/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility

  const handleLogout = () => {
    dispatch(logOut(null));
  };

  return (
    <nav className="w-full fixed top-0 bg-[#eab3080f] shadow-md">
    <div className="flex justify-between mx-auto py-3 max-w-5xl px-3">
        <img src="/src/assets/logo.jpeg" className=" h-16 w-16 object-cover rounded-[50%]"></img>
        {auth.isLoggedIn && (
          <div className="flex gap-5 items-center">
            <div className="relative">
              {/* Avatar */}
      
              <FontAwesomeIcon
                size="xl"
                className="cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
                icon={faUserCircle}
              />
      
              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                  <div className="p-4">
                    <p className="text-gray-600">{auth?.name}</p>
                    <p className="text-gray-400 text-sm">{auth?.email}</p>
                  </div>
                  <hr className="border-gray-200" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                   <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon> Logout 
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
    </nav>
  );
};
