import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const userString = localStorage.getItem("user");

      // Parse chuỗi JSON thành đối tượng JavaScript
      const user = JSON.parse(userString);

      // Trích xuất token từ đối tượng user
      const token = user.token;
        const res = await fetch(`http://localhost:8000/api/user/getUsers`, {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào tiêu đề Authorization
          },
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
