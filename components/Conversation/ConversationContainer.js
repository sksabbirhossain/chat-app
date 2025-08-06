import ConversationItem from "./ConversationItem";

const ConversationContainer = () => {
  return (
    <div className="sidebar h-full w-full overflow-y-auto">
      {/* Search Box */}
      <div className="fixed top-0 left-0 z-10 w-full max-w-md bg-white">
        <div className="relative border-b border-gray-200">
          <input
            type="text"
            placeholder="Search a conversation..."
            // name={query}
            // onChange={(e) => setQuery(e.target.value)}
            className="w-full py-[18px] pr-4 pl-10 shadow-green-500/20 focus:shadow-sm focus:outline-none"
          />
          <svg
            className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="20"
            height="20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 15z"
            />
          </svg>
        </div>
      </div>

      {/* showing search items */}
      {/* <ul>
        {searchUsers?.map((user) => (
          <SearchItem
            user={user}
            key={user?._id}
            senderId={userInfo?._id}
            setSearchUsers={setSearchUsers}
            setQuery={setQuery}
          />
        ))}
      </ul> */}

      {/* Conversation List */}
      <div className="pt-[65px]">
        <ul className="space-y-2 px-0.5 font-medium">
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
        </ul>
      </div>
    </div>
  );
};

export default ConversationContainer;
