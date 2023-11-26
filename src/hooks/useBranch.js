import { useEffect } from "react";
import { useState } from "react";

const useBranch = (id) => {
  const [allBranch, setAllBranch] = useState([]);
  useEffect(() => {
    fetch("https://api.psh.com.bd/api/branch")
      .then((res) => res.json())
      .then((data) => {
        setAllBranch(data);
      });
  }, [id]);
  return [allBranch];
};

export default useBranch;
