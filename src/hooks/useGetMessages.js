import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const userString = localStorage.getItem("user");

        // Parse chuỗi JSON thành đối tượng JavaScript
        const user = JSON.parse(userString);

        // Trích xuất token từ đối tượng user
        const token = user.token;
        const res = await fetch(
          `http://localhost:8000/api/messages/get/${selectedConversation._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào tiêu đề Authorization
            },
          }
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation._id) getMessages();
  }, [selectedConversation?._id, setMessages]);
  return { messages, loading };
};

export default useGetMessages;
