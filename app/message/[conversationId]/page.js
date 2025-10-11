"use client";
import DropdownMenu from "@/components/Message/DropdownMenu";
import SendMessage from "@/components/Message/SendMessage";
import { socket } from "@/configs/socket";
import useSidebarMenu from "@/contexts/sidebarContext";
import { format, isToday } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState({});
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // control dropdown menu
  useEffect(() => {
    function handleClickOutside(event) {
      // if click is outside both dropdown and button, close menu
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  // ✅ Check if the receiver is online
  useEffect(() => {
    if (!receiver?._id) return;

    // ✅ Ask backend if receiver is online
    socket.emit("checkUserOnline", receiver._id, (isOnlineResponse) => {
      setIsOnline(isOnlineResponse);
    });

    const handleUserOnline = (userId) => {
      if (userId === receiver?._id) setIsOnline(true);
    };
    const handleUserOffline = (userId) => {
      if (userId === receiver?._id) setIsOnline(false);
    };

    socket.on("userOnline", handleUserOnline);
    socket.on("userOffline", handleUserOffline);

    return () => {
      socket.off("userOnline", handleUserOnline);
      socket.off("userOffline", handleUserOffline);
    };
  }, [receiver]);

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
      {/* Header / showing message receiver informations  */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-md">
        <div className="flex items-center gap-3">
          <Image
            src={receiver?.profilePic ? `` : "/default.jpg"}
            alt={"John Doe"}
            className="h-9 w-9 rounded-full object-cover ring-2 ring-green-700"
            width={36}
            height={36}
          />
          <div className="space-y-0 leading-tight">
            <p className="text-[16px] font-medium text-gray-800 capitalize">
              {receiver?.name}
            </p>
            {/* shwoing active status */}
            <p
              className={`text-[13px] ${
                isOnline ? "text-green-600" : "text-gray-500"
              }`}
            >
              {isOnline ? "Active" : "Offline"}
            </p>
          </div>
        </div>
        {/* open sidebar conversation list for small devices */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-x-1 sm:gap-x-3">
            <p className="rotat rounded-full p-1.5 hover:cursor-pointer hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </p>
            <p className="rounded-full p-1.5 hover:cursor-pointer hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </p>
            <div className="relative">
              <p
                className="cursor-pointer"
                ref={buttonRef}
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
              </p>

              {/* Dropdown menu  */}
              {menuOpen && (
                <div ref={menuRef}>
                  <DropdownMenu />
                </div>
              )}
            </div>
          </div>
          <button
            className="flex cursor-pointer items-center justify-end rounded-lg p-2 text-sm text-gray-500 ring-1 hover:bg-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none sm:hidden"
            onClick={handleOpenSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="size-5"
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
