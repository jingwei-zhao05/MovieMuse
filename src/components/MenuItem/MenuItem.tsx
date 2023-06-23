import React, { useRef, useState } from "react";
import { NavLink, Link, To } from "react-router-dom";

/**
 * @author
 * @function MenuItem
 **/

const MenuItem = (props: {
  onClick: any;
  name?: any;
  subMenus?: any;
  iconClassName?: any;
  to?: any;
  exact?: any;
}) => {
  const { name, subMenus, iconClassName, onClick, to, exact } = props;
  const [expand, setExpand] = useState(false);

  return (
    <li onClick={props.onClick}>
      <Link
        to={to}
        // onClick={() => {
        //   setExpand((e) => !e);
        // }}
        className={`menu-item`}
      >
        <div className="menu-icon">
          <i className={iconClassName}></i>
        </div>
        <span>{name}</span>
      </Link>
      {subMenus && subMenus.length > 0 ? (
        <ul className={`sub-menu`}>
          {subMenus.map(
            (
              menu: {
                to: To;
                name:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | ((props: {
                      isActive: boolean;
                      isPending: boolean;
                    }) => React.ReactNode)
                  | null
                  | undefined;
              },
              index: React.Key | null | undefined
            ) => (
              <li key={index}>
                <NavLink to={menu.to}>{menu.name}</NavLink>
              </li>
            )
          )}
        </ul>
      ) : null}
    </li>
  );
};

export default MenuItem;
