import Image from "next/image";
import { useState } from "react";
import StartConversationContainer from "./StartConversationContainer";

const SearchItem = ({ conversation, setQuery }) => {
  const [startConversation, setStartConversation] = useState(false);

  return (
    <>
      <li
        key={conversation?._id}
        className="rounded-sm border-b border-gray-200 bg-white transition-colors duration-300 hover:bg-green-600/20"
        onClick={() => setStartConversation(!startConversation)}
      >
        <div className="group flex items-center gap-3 rounded-lg px-3 py-3 text-gray-900 transition-colors duration-300 hover:bg-green-600/10">
          {/* Profile picture */}
          <Image
            src={
              conversation?.profilePic
                ? `${conversation?.profilePic}`
                : "/default.jpg"
            }
            alt={conversation?.name}
            className="h-11 w-11 rounded-full object-cover p-0.5 ring-1 ring-green-600"
            width={100}
            height={100}
          />

          {/* Name + Last Message */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-medium capitalize">
              {conversation?.name}
            </p>
            <p className="truncate text-[13px] text-gray-500">
              {conversation?.lastMessage || "No messages yet"}
            </p>
          </div>
        </div>
      </li>
      {/* create conversation input container */}
      {startConversation && (
        <StartConversationContainer
          setStartConversation={setStartConversation}
          receiverId={conversation?._id}
          setQuery={setQuery}
        />
      )}
    </>
  );
};

export default SearchItem;
