import getTime from "@/utils/getTime";
import Image from "next/image";
import Link from "next/link";

const ConversationItem = ({ conversation, currentUserId, isActive }) => {
  // Find the conversation partner
  const partner = conversation?.participants?.find(
    (member) => member._id !== currentUserId,
  );
  return (
    <li
      key={conversation?._id}
      className={`group rounded-sm text-gray-900 shadow-sm shadow-gray-100 transition-colors duration-300 hover:bg-green-600/20 ${
        isActive ? "bg-green-400/30" : "bg-white"
      }`}
    >
      <Link
        href={`/message/${conversation?._id}`}
        className="group flex items-center gap-3 px-3 py-3"
      >
        {/* Profile picture */}
        <Image
          src={partner?.profilePic ? `${partner.profilePic}` : "/default.jpg"}
          alt={partner?.name}
          className="h-11 w-11 rounded-full object-cover p-0.5 ring-1 ring-green-400"
          width={100}
          height={100}
        />

        {/* Name + Last Message */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-medium text-gray-600 capitalize group-hover:text-gray-800">
            {partner?.name}
          </p>
          <p className="truncate text-[13px] text-gray-500 group-hover:text-gray-700">
            {conversation?.lastMessage || "No messages yet"}
          </p>
        </div>

        {/* Timestamp */}
        <span className="text-[11px] text-gray-400">
          {conversation?.updatedAt ? getTime(conversation?.updatedAt) : ""}
        </span>
      </Link>
    </li>
  );
};

export default ConversationItem;
