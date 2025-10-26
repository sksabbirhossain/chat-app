import Sidebar from "@/components/Conversation/Sidebar";

export const metadata = {
  title: "Messages",
  description: "ChatApp messaging interface",
};

const MessageLayout = ({ children }) => {
  return (
    <div className="relative mx-auto w-full max-w-5xl sm:pt-1">
      {/* sidebar */}
      <Sidebar />

      {/* message contents */}
      <div className="sm:ml-64 sm:px-2">{children}</div>
    </div>
  );
};

export default MessageLayout;
