import { socket } from "@/configs/socket";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const UserSendMessage = ({
  receiverId,
  setSendMessageInputIsOpen,
  setQuery,
  setConversations,
}) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data: session } = useSession();

  const router = useRouter();

  // Function to handle sending the message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    setError(null);

    try {
      //  sending message
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/conversations/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          body: JSON.stringify({
            senderId: session?.user?._id,
            receiverId: receiverId,
            lastMessage: message,
          }),
        },
      );

      const data = await res.json();

      // Handle success
      if (data?.conversation) {
        // Emit message to receiver
        socket.emit("sendMessage", {
          ...data?.message,
          receiver: data?.message?.receiver,
          conversation: data?.conversation,
        });

        // Update conversations list
        setConversations((prevConversations) => [
          data.conversation,
          ...prevConversations,
        ]);

        setQuery("");
        setMessage("");
        setSendMessageInputIsOpen(false);
        setLoading(false);
        setError(null);
        // Redirect to the new conversation
        router.push(`/message/${data.conversation._id}`);
      }
    } catch (err) {
      setError("Failed to send message");
      setLoading(false);
      toast.error("Failed to send message");
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <div className="mb-1 flex w-full items-center gap-1 rounded-md py-2 ring-1 ring-gray-300 focus:ring-green-600 focus:outline-none">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full border-0 py-1 ps-3 pe-1 text-gray-900 placeholder-gray-500 ring-0 outline-0 sm:text-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          disabled={loading || message.trim() === "" ? true : false}
          className="cursor-pointer rounded-full pe-1 text-green-600 transition-colors duration-200 ease-in-out hover:text-green-700 disabled:cursor-not-allowed disabled:text-gray-400"
          type="submit"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
};

export default UserSendMessage;
