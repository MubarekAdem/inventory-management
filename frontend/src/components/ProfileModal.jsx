import React, { useState, useEffect } from "react";
import { Modal, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../services/api";

const ProfileModal = ({ isOpen, onClose, onLogout }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      fetchUser();
    }
  }, [isOpen]);

  const fetchUser = async () => {
    try {
      const userData = await fetchUserProfile();
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate("/signin");
  };

  if (!user) {
    return null;
  }

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      size="sm"
      className="modal-backdrop-blur"
    >
      <Modal.Header>Profile</Modal.Header>
      <Modal.Body>
        <Card className="max-w-xs mx-auto bg-white dark:bg-gray-800 shadow-lg">
          <div className="flex flex-col items-center pb-10">
            <img
              alt="Profile picture"
              src="https://cdn-icons-png.flaticon.com/512/9203/9203764.png"
              className="mb-3 w-24 h-24 rounded-full shadow-lg"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user.firstName || "First Name"} {user.lastName || "Last Name"}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.email || "User Email"}
            </span>
            <div className="mt-4 flex flex-col space-y-3">
              <a
                href="#"
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          </div>
        </Card>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileModal;
