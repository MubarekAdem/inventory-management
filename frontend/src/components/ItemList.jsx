import React, { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import { HiPencilAlt, HiTrash, HiMoon } from "react-icons/hi";
import AddItemForm from "./AddItemForm";
import { Table } from "flowbite-react";
import axios from "axios";

function ItemList({ categories, onEditItem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchItemsData();
  }, []);

  useEffect(() => {
    // Toggle dark mode on the entire body
    if (darkMode) {
      document.body.classList.add("dark", "bg-gray-900", "text-white");
    } else {
      document.body.classList.remove("dark", "bg-gray-900", "text-white");
    }
  }, [darkMode]);

  const fetchItemsData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleOpenModal = (item = null) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      fetchItemsData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleItemSaved = (savedItem) => {
    handleCloseModal();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between mb-4">
        <Button.Group outline>
          <Button color="gray" onClick={() => handleOpenModal()}>
            Add Item
          </Button>
        </Button.Group>
        <Button onClick={toggleDarkMode}>
          <HiMoon color="black" />
        </Button>
      </div>

      <Modal show={isModalOpen} onClose={handleCloseModal}>
        <Modal.Header>
          {selectedItem ? "Edit Item" : "Add New Item"}
        </Modal.Header>
        <Modal.Body>
          <AddItemForm
            onItemAdded={handleItemSaved}
            categories={categories}
            initialItem={selectedItem}
          />
        </Modal.Body>
      </Modal>

      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Product Name</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {items.map((item) => (
              <Table.Row
                key={item._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.name}
                </Table.Cell>
                <Table.Cell>{item.quantity}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell>${item.price.toFixed(2)}</Table.Cell>
                <Table.Cell>
                  <div className="flex space-x-2">
                    <button className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      <HiPencilAlt />
                    </button>
                    <button
                      className="font-medium text-red-600 hover:underline dark:text-red-500"
                      onClick={() => handleDelete(item._id)}
                    >
                      <HiTrash />
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default ItemList;
