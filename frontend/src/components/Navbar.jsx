import React, { useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiInbox,
  HiOutlineArrowCircleDown,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = ({ onLogout, onProfileClick, darkMode }) => {
  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      className={darkMode ? "dark" : ""}
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="#"
            icon={HiUser}
            className="profile-icon"
            onClick={onProfileClick}
          >
            Profile
          </Sidebar.Item>

          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>

          <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
            <Sidebar.Item as={Link} to="/items">
              Inventories in Stock
            </Sidebar.Item>
            <Sidebar.Item href="#">Sales</Sidebar.Item>
            <Sidebar.Item href="#">Categories</Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Item
            href="#"
            icon={HiOutlineArrowCircleDown}
            onClick={onLogout}
          >
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default Navbar;
