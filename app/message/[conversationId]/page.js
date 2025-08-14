"use client";
import SendMessage from "@/components/Message/SendMessage";
import useSidebarMenu from "@/contexts/sidebarContext";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const { handleOpenSidebar } = useSidebarMenu();
  const conversationId = "12345"; // Example conversation ID
  const userInfo = { _id: "user123", name: "John Doe", profilePic: "" }; // Example user info
  const receiver = { _id: "receiver123", name: "Jane Smith", profilePic: "" }; // Example receiver info

  useEffect(() => {
    setMessages([
      {
        _id: "msg1",
        sender: { _id: "user123", name: "John Doe" },
        text: "Hello!",
        files: [],
        createdAt: new Date("2025-08-01T10:00:00Z"),
      },
      {
        _id: "msg2",
        sender: { _id: "user456", name: "Jane Smith" },
        text: "Hi there!",
        files: [],
        createdAt: new Date("2025-08-01T10:05:00Z"),
      },
      {
        _id: "msg3",
        sender: { _id: "user123", name: "John Doe" },
        text: "How are you?",
        files: [],
        createdAt: new Date("2025-08-01T10:10:00Z"),
      },
      {
        _id: "msg4",
        sender: { _id: "user456", name: "Jane Smith" },
        text: "I'm good, thanks! How about you?",
        files: [],
        createdAt: new Date("2025-08-01T10:12:00Z"),
      },
      {
        _id: "msg5",
        sender: { _id: "user123", name: "John Doe" },
        text: "Doing well, working on a new project.",
        files: [],
        createdAt: new Date("2025-08-01T10:15:00Z"),
      },
      {
        _id: "msg6",
        sender: { _id: "user456", name: "Jane Smith" },
        text: "That's great! Let me know if you want help.",
        files: [],
        createdAt: new Date("2025-08-01T10:18:00Z"),
      },
      {
        _id: "msg7",
        sender: { _id: "user123", name: "John Doe" },
        text: "Sure, will do! Thanks.",
        files: [],
        createdAt: new Date("2025-08-01T10:20:00Z"),
      },
      {
        _id: "msg8",
        sender: { _id: "user456", name: "Jane Smith" },
        text: "No problem!",
        files: [],
        createdAt: new Date("2025-08-01T10:22:00Z"),
      },
      {
        _id: "msg9",
        sender: { _id: "user123", name: "John Doe" },
        text: "By the way, did you see the latest update?",
        files: [],
        createdAt: new Date("2025-08-01T10:25:00Z"),
      },
      {
        _id: "msg10",
        sender: { _id: "user456", name: "Jane Smith" },
        text: "Yes, looks promising!",
        files: [],
        createdAt: new Date("2025-08-01T10:27:00Z"),
      },
      {
        _id: "msg11",
        sender: { _id: "user123", name: "John Doe" },
        text: "I think it will improve our workflow.",
        files: [
          { url: "/files/report-aug-01.pdf", name: "Report August 2025.pdf" },
        ],
        createdAt: new Date("2025-08-01T10:30:00Z"),
      },
      {
        _id: "msg12",
        sender: { _id: "user456", name: "Jane Smith" },
        text: "Absolutely. Can't wait to try it out.",
        files: [],
        createdAt: new Date("2025-08-01T10:32:00Z"),
      },
      {
        _id: "msg13",
        sender: { _id: "user123", name: "John Doe" },
        text: "Let's catch up later and discuss the details.",
        files: [],
        createdAt: new Date("2025-08-01T10:35:00Z"),
      },
      {
        _id: "msg14",
        sender: { _id: "user456", name: "Jane Smith" },
        text: "Sounds good! Talk soon.",
        files: [
          { url: "/files/report-aug-01.pdf", name: "Report August 2025.pdf" },
        ],
        createdAt: new Date("2025-08-01T10:37:00Z"),
      },
      {
        _id: "msg15",
        sender: { _id: "user123", name: "John Doe" },
        text: "Bye for now.",
        files: [
          { url: "/files/report-aug-01.pdf", name: "Report August 2025.pdf" },
        ],
        createdAt: new Date("2025-08-01T10:40:00Z"),
      },
      {
        _id: "msg16",
        sender: { _id: "user456", name: "Jane Smith" },
        text: "Bye!",
        files: [],
        createdAt: new Date("2025-08-01T10:42:00Z"),
      },
      {
        _id: "msg17",
        sender: { _id: "user123", name: "John Doe" },
        text: "Oh, one more thing, I added some docs to the repo.",
        files: [],
        createdAt: new Date("2025-08-01T10:45:00Z"),
      },
      {
        _id: "msg18",
        sender: { _id: "user456", name: "Jane Smith" },
        text: "Thanks for the update! I'll check it out.",
        files: [
          { url: "/files/report-aug-01.pdf", name: "Report August 2025.pdf" },
        ],
        createdAt: new Date("2025-08-01T10:47:00Z"),
      },
      {
        _id: "msg19",
        sender: { _id: "user123", name: "John Doe" },
        text: "Great! Let me know if you have questions.",
        files: [],
        createdAt: new Date("2025-08-01T10:50:00Z"),
      },
      {
        _id: "msg20",
        sender: { _id: "user456", name: "Jane Smith" },
        text: "Will do. Thanks!",
        files: [],
        createdAt: new Date("2025-08-01T10:52:00Z"),
      },
      {
        _id: "msg20",
        sender: { _id: "user456", name: "Jane Smith" },
        text: "Will do. Thanks!",
        files: [],
        createdAt: new Date("2025-08-01T10:53:00Z"),
      },
      {
        _id: "msg19",
        sender: { _id: "user123", name: "John Doe" },
        text: "Great! Let me know if you have questions.",
        files: [],
        createdAt: new Date("2025-08-01T10:55:00Z"),
      },
    ]);
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden rounded-lg bg-white sm:h-[95vh]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-md">
        <div className="flex items-center gap-3">
          <Image
            src={receiver?.profilePic ? `` : "/default.jpg"}
            alt={"John Doe"}
            className="h-9 w-9 rounded-full object-cover ring-2 ring-green-700"
            width={36}
            height={36}
          />
          <span className="text-[16px] font-medium text-gray-800 capitalize">
            {receiver?.name}
          </span>
        </div>
        {/* open sidebar conversation list for small devices */}
        <button
          className="flex cursor-pointer items-center justify-end rounded-lg p-2 text-sm text-gray-500 ring-2 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none sm:hidden"
          onClick={handleOpenSidebar}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      </div>

      {/* Messages Area */}
      <div className="messages flex flex-1 flex-col-reverse gap-2 overflow-y-auto bg-gray-50 p-4">
        {/* if message not found */}
        {messages?.length === 0 && (
          <p className="text-center">no messages found!</p>
        )}

        {/* loop all the messages */}
        {messages
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((msg) => {
            const isMe = (msg?.sender?._id || msg?.sender) === userInfo?._id;

            return (
              <div
                key={msg?._id}
                className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-xs">
                  {/* showing text messages */}
                  {msg?.text !== "" && (
                    <>
                      <div
                        className={`max-w-xs rounded-lg px-2 py-1 text-[15px] ${
                          isMe
                            ? "bg-green-700 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        <p>{msg?.text}</p>
                        {/* showing message time */}
                        <p
                          className={`text-right text-xs ${isMe ? "text-gray-200" : "text-gray-500"}`}
                        >
                          {msg?.createdAt &&
                            format(new Date(msg?.createdAt), "p")}
                        </p>
                      </div>
                    </>
                  )}

                  {/* showing files */}
                  {msg?.files.length > 0 &&
                    msg?.files?.map((file, i) => (
                      <div className="pt-1" key={i}>
                        <Image
                          className="h-full w-full rounded-md object-cover"
                          src={`/default.jpg`} // Replace with file.url if available
                          width={500}
                          height={500}
                          alt={`message file ${i + 1}`}
                        />
                        {/* showing message time */}
                        <div
                          className={`mt-1 text-right text-xs text-gray-500`}
                        >
                          {msg?.createdAt &&
                            format(new Date(msg?.createdAt), "p")}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
      </div>

      {/* Message Input */}
      <div className="flex items-center gap-2 border-t border-gray-200 bg-white px-1 py-1">
        {/* Wrapper */}
        <SendMessage
          setMessages={setMessages}
          conversationId={conversationId}
          currentUserId={userInfo?._id}
          receiverId={receiver?._id}
        />
      </div>
    </div>
  );
};

export default Conversation;
