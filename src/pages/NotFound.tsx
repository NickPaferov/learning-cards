import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div>
      <h2>NotFound</h2>
      <h3>
        Go <Link to="/">home</Link>
      </h3>
    </div>
  );
};
