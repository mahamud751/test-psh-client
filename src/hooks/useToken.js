import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      fetch(`https://api.psh.com.bd/api/users/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.JWT_SECRET) {
            localStorage.setItem("JWT_SECRET", data.JWT_SECRET);
            setToken(data.JWT_SECRET);
          }
        });
    }
  }, [email]);
  return [token];
};

export default useToken;
