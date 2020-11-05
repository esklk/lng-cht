import { Button, Icon } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import "./NavbarItem.css";

export default function NavbarItem({ id, name, iconName, path }) {
  return (
    <div id={id} className="navbar-item">
      <NavLink activeClassName="navbar-item-link-active" to={path}>
        <Button className="navbar-item-button">
          <div className="navbar-item-button-wrapper">
            <span className="navbar-item-button-icon">
              {iconName ? <Icon>{iconName}</Icon> : null}
            </span>
            <span className="navbar-item-button-label">{name}</span>
          </div>
        </Button>
      </NavLink>
    </div>
  );
}
