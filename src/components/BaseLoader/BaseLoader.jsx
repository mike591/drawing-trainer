import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { useAuth } from "hooks/useAuth";

const BaseLoader = () => {
  const { isLoadingAuth } = useAuth();
  return (
    <div>
      {isLoadingAuth && (
        <Dimmer className="BaseLoader" active>
          <Loader />
        </Dimmer>
      )}
    </div>
  );
};

export default BaseLoader;
