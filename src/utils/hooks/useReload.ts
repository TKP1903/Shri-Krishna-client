import { useState } from "react";

const useReload = () => {
  const [reload, setReload] = useState(false);
  return () => {
    setReload((_) => !_);
  };
};

export default useReload;
