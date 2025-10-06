import getTime from "@/utils/getTime";
import Image from "next/image";
import Link from "next/link";

const ConversationItem = ({ conversation, currentUserId }) => {
  // Find the conversation partner
  const partner = conversation?.participants?.find(
    (member) => member._id !== currentUserId,
  );
  return (
    <li
      key={conversation?._id}
      className="rounded-sm shadow shadow-green-800/20"
    >
      <Link
        href={`/message/${conversation?._id}`}
        className="group flex items-center gap-3 rounded-lg px-3 py-3 text-gray-900 transition-colors duration-300 hover:bg-green-600/10"
      >
        {/* Profile picture */}
        <Image
          src={partner?.profilePic ? `${partner.profilePic}` : "/default.jpg"}
          alt={partner?.name}
          className="h-11 w-11 rounded-full object-cover p-0.5 ring-1 ring-green-600"
          width={100}
          height={100}
        />

        {/* Name + Last Message */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold capitalize">
            {partner?.name}
          </p>
          <p className="truncate text-sm text-gray-500">
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
