"use client";
import SendMessage from "@/components/Message/SendMessage";
import { socket } from "@/configs/socket";
import useSidebarMenu from "@/contexts/sidebarContext";
import { format, isToday } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // get conversation id from url
  const params = useParams();
  const { conversationId } = params;

  // auth session
  const { data: session } = useSession();
  const userInfo = session?.user;

  // sidebar menu context
  const { handleOpenSidebar } = useSidebarMenu();

  // 💬 listen for new messages
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  //get all messages for this conversation
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setErrors({});
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/messages/${conversationId}`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          },
        );

        const data = await res.json();

        if (data?.data) {
          // find the receiver info from messages
          const receiverInfo =
            data.data[0]?.sender?._id === userInfo?._id
              ? data.data[0]?.receiver
              : data.data[0]?.sender;

          setReceiver(receiverInfo);

          // set messages
          setMessages(data.data);
          setLoading(false);
          setErrors({});
        } else {
          setLoading(false);
          setErrors({
            errors: {
              common: {
                msg: "Interanal server error!",
              },
            },
          });
        }
      } catch (err) {
        setLoading(false);
        setErrors({
          errors: {
            common: {
              msg: "Server error occurred!",
            },
          },
        });
      }
    };

    if (conversationId) fetchMessages();
  }, [conversationId, session, userInfo]);

  return (
    <div className="flex h-screen flex-col overflow-hidden rounded-lg bg-white sm:h-[95vh]">
      {/* Header / showing message receiver informations */}
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
      <div
        className="flex flex-1 flex-col-reverse gap-2 overflow-y-auto bg-gray-50 p-4"
        id="messages"
      >
        <>
          {/* showing loading */}
          {loading && <p className="text-center">Loading...</p>}

          {/* showing error */}
          {errors?.errors?.common && (
            <p className="text-center text-sm font-semibold text-red-600">
              {errors.errors.common.msg}
            </p>
          )}

          {/* if message not found */}
          {loading && messages?.length === 0 && (
            <p className="text-center">no messages found!</p>
          )}
        </>

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
                        {msg?.createdAt && isToday(msg?.createdAt)
                          ? format(msg?.createdAt, "hh:mm a")
                          : format(msg?.createdAt, "MMM d yyy, hh:mm a")}
                      </p>
                    </div>
                  )}

                  {/* showing files */}
                  {msg?.files?.length > 0 &&
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
          receiverId={receiver}
        />
      </div>
    </div>
  );
};

export default ChatPage;
