import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "hooks/useQuery";
import { publicRoutes } from "utils/routes";

const SharePage = () => {
  const history = useHistory();
  const query = useQuery();
  const drawingID = query.get("drawingId");
  if (!drawingID) {
    history.push(publicRoutes.login.path);
  }

  return <div>share: {drawingID}</div>;
};

export default SharePage;
