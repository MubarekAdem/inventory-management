import React from "react";
import { Modal, Card, Dropdown } from "flowbite-react";
import { useNavigate } from "react-router-dom";
const ProfileModal = ({ isOpen, onClose, user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the logout function passed from the parent
    navigate("/signin"); // Redirect to sign-in page
  };

  if (!user) {
    return null; // Render nothing if user is not provided
  }

  return (
    <Modal show={isOpen} onClose={onClose} size="sm">
      <Modal.Header>Profile</Modal.Header>
      <Modal.Body>
        <Card className="max-w-xs mx-auto">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <img
              alt="Profile picture"
              height="96"
              src="https://www.google.com/imgres?q=profile%20icon&imgurl=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F9203%2F9203764.png&imgrefurl=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fprofile_9203764&docid=4ti9q9uLSMvNMM&tbnid=uEkEezh08pt33M&vet=12ahUKEwi83Zf-jPqHAxVT1AIHHY2aAD4QM3oECDQQAA..i&w=512&h=512&hcb=2&ved=2ahUKEwi83Zf-jPqHAxVT1AIHHY2aAD4QM3oECDQQAA"
              width="96"
              className="mb-3 rounded-full shadow-lg"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user.name || "User Name"}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.email || "User Email"}
            </span>
            <div className="mt-4 flex flex-col space-y-3 lg:mt-6">
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
