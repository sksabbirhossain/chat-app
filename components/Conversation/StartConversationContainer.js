import { socket } from "@/configs/socket";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const StartConversationContainer = ({
  receiverId,
  setStartConversation,
  setQuery,
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

        setQuery("");
        setMessage("");
        setStartConversation(false);
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
      <div className="flex w-full items-center gap-1 pb-1">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full rounded-md border-gray-300 px-3 py-2 ring-1 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          disabled={loading}
          className="cursor-pointer rounded-md bg-green-600 px-2 py-2 text-white ring-1 hover:bg-green-700"
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

export default StartConversationContainer;
