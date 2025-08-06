"use client";

import ConversationContainer from "@/components/Conversation/ConversationContainer";
import useSidebarMenu from "@/contexts/sidebarContext";
import { useState } from "react";

const MessageLayout = ({ children }) => {
  const { openSidebar } = useSidebarMenu();

  return (
    <div className="mx-auto w-full max-w-5xl pt-4">
      {/* sidebar message list */}
      <aside
        class={`fixed h-[95vh] w-64 -translate-x-full overflow-hidden rounded-lg transition-transform sm:translate-x-0 ${openSidebar ? "translate-x-0" : ""}`}
      >
        <div className="h-full bg-white shadow-md">
          <ConversationContainer />
        </div>
      </aside>

      {/* message contents */}
      <div class="px-2 sm:ml-64">{children}</div>
    </div>
  );
};

export default MessageLayout;
