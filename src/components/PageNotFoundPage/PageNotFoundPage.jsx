import React from "react";
import { useHistory } from "react-router-dom";

const PageNotFoundPage = () => {
  const history = useHistory();
  return (
    <div className="PageNotFoundPage">
      <p>404 not found!</p>
      <button onClick={() => history.push("/")}>Return</button>
    </div>
  );
};

export default PageNotFoundPage;
