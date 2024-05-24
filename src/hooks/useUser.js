import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

const useUser = (email) => {
  const [currentUser, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!email) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`${BASE_URL}/user`, {
          email,
        });
        setUser(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  return { currentUser, loading, error };
};

export default useUser;
