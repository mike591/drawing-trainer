import { useLocation } from "react-router-dom";

// let query = useQuery();
// query.get("name")
export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
