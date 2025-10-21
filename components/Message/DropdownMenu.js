import { deleteConversationById } from "@/actions/conversation/conversationActions";
import { useState } from "react";
import { toast } from "react-toastify";

const DropdownMenu = ({ conversationId }) => {
  const [loading, setLoading] = useState(false);

  // created delete conversation handler
  const handleDeleteConversation = async () => {
    setLoading(true);
    try {
      const data = await deleteConversationById(conversationId);
      if (data?.status === 200) {
        toast.success("Conversation deleted successfully");
        setLoading(false);
        window.location.href = "/message";
      } else {
        toast.error("Failed to delete conversation");
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-3 -right-3">
      <div className="absolute top-8 right-0 z-10 w-48 rounded-md bg-white p-2 shadow-lg">
        <p className="block w-full cursor-pointer rounded-md px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-green-50">
          View Profile
        </p>
        <p className="block w-full cursor-pointer rounded-md px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-green-50">
          Mute Notifications
        </p>
        <p className="block w-full cursor-pointer rounded-md px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-green-50">
          Block User
        </p>
        <p
          className={`block w-full cursor-pointer rounded-md px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-green-50 ${
            loading ? "cursor-wait opacity-50" : ""
          }`}
          onClick={handleDeleteConversation}
        >
          Delete Conversation
        </p>
      </div>
    </div>
  );
};

export default DropdownMenu;
