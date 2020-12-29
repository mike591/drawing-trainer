import React from "react";
import { Header } from "semantic-ui-react";

const MobileNotSupportedPage = () => {
  return (
    <div className="MobileNotSupportedPage">
      <Header>Mobile is currently not supported.</Header>
      <p>Please view on a desktop browser.</p>
    </div>
  );
};

export default MobileNotSupportedPage;
