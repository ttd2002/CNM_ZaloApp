import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessage = async (message) => {
    setLoading(true);
    try {
        const userString = localStorage.getItem("user");

        // Parse chuỗi JSON thành đối tượng JavaScript
        const user = JSON.parse(userString);

        // Trích xuất token từ đối tượng user
        const token = user.token;
      const res = await fetch(
        `http://localhost:8000/api/messages/send/${selectedConversation._id}`,
        
        {
          method: "POST",
          headers: {
             Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
           
          },
          body: JSON.stringify({message})
        })
        const data = await res.json()
        // console.log(data[messages]);
        if(data.error) throw new Error(data.error)
        setMessages([...messages, data])
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return {sendMessage, loading}
};

export default useSendMessage;
