import Image from "next/image";
import { useState } from "react";
import UserSendMessage from "./UserSendMessage";

const UserItem = ({ user, setConversations, setQuery }) => {
  const [sendMessageInputIsOpen, setSendMessageInputIsOpen] = useState(false);
  return (
    <>
      <li
        key={user._id}
        className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-gray-100"
        onClick={() => setSendMessageInputIsOpen(!sendMessageInputIsOpen)}
      >
        <Image
          src={user?.profile || "/default.jpg"}
          alt={user?.name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover ring-1 ring-green-600"
        />
        <div className="flex flex-col">
          <span className="columns-1 text-[15px] font-medium capitalize">
            {user?.name}
          </span>
          <span className="line-clamp-1 text-xs text-gray-500">
            {user?.lastMessage || "No messages yet"}
          </span>
        </div>
      </li>
      {/* create conversation input container */}
      {sendMessageInputIsOpen && (
        <UserSendMessage
          setSendMessageInputIsOpen={setSendMessageInputIsOpen}
          receiverId={user?._id}
          setQuery={setQuery}
          setConversations={setConversations}
        />
      )}
    </>
  );
};

export default UserItem;
