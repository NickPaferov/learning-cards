import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../app/App";

export const NotFound = () => {
  return (
    <div>
      <h2>NotFound</h2>
      <h3>
        Go <Link to={PATHS.INDEX}>home</Link>
      </h3>
    </div>
  );
};
