import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { useAuth } from "hooks/useAuth";

const BaseLoader = () => {
  const { isLoadingAuth } = useAuth();
  if (isLoadingAuth) {
    return (
      <Dimmer className="BaseLoader" active>
        <Loader />
      </Dimmer>
    );
  } else {
    return null;
  }
};

export default BaseLoader;
