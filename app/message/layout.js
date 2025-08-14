"use client";

import ConversationContainer from "@/components/Conversation/ConversationContainer";
import useSidebarMenu from "@/contexts/sidebarContext";

const MessageLayout = ({ children }) => {
  const { openSidebar } = useSidebarMenu();

  return (
    <div className="mx-auto w-full max-w-5xl sm:pt-4">
      {/* sidebar message list */}
      <aside
        className={`fixed h-screen w-64 -translate-x-full overflow-hidden rounded-lg transition-transform sm:h-[95vh] sm:translate-x-0 ${openSidebar ? "translate-x-0" : ""}`}
      >
        <div className="h-full bg-white shadow-md">
          <ConversationContainer />
        </div>
      </aside>

      {/* message contents */}
      <div className="sm:ml-64 sm:px-2">{children}</div>
    </div>
  );
};

export default MessageLayout;
