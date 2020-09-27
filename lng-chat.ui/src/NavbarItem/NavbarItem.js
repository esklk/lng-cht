import React from "react";
import { Link } from "react-router-dom";
import "./NavbarItem.css";

export default function NavbarItem({ name, path }) {
  return (
    <div className="navbar_item">
      <Link to={path}>
        <p id={name} className="title">
          {name}
        </p>
      </Link>
    </div>
  );
}
