"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const SendMessage = ({
  setMessages,
  conversationId,
  currentUserId,
  receiverId,
}) => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);

  // auth session
  const { data: session } = useSession();

  // send message handler
  const handleSendMessage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("conversationId", conversationId);
    formData.append("sender", currentUserId);
    formData.append("receiver", receiverId);
    formData.append("text", text);

    // Append all selected files
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
        method: "POST",
        body: JSON.stringify({
          conversationId,
          sender: currentUserId,
          receiver: receiverId ? receiverId : receiverId?._id,
          text,
          files,
        }),
        headers: {
          // Accept: "application/json",
          // "Content-Type": "multipart/form-data",
          "content-type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
      });

      const data = await res.json();

      const newMsg = data?.data;

      setMessages((prev) => [...prev, newMsg]);
      setText("");
      setFiles([]);

      // Emit message to receiver
      // socket.emit("newMessage", {
      //   message: res.data.data,
      //   receiverId,
      // });

      // Emit message for conversation
      //   socket.emit("conversation", {
      //     conversation: {
      //       _id: newMsg?.conversationId,
      //       participants: [newMsg?.sender, newMsg?.receiver],
      //       lastMessage: newMsg?.text,
      //       createdAt: newMsg?.createdAt,
      //       updatedAt: newMsg?.updatedAt,
      //       lastMessageAt: newMsg?.updatedAt,
      //       lastSender: currentUserId,
      //     },
      //     receiverId,
      //   });
    } catch (err) {
      console.error("Message send error", err);
    }
  };

  return (
    <div className="w-full space-y-2">
      {/* File preview */}
      {files?.length > 0 && (
        <div className="flex max-w-full gap-2 overflow-x-auto py-1 whitespace-nowrap">
          {files.map((file, index) => (
            <div key={index} className="group relative flex-shrink-0">
              <Image
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className="h-20 w-20 rounded-md object-cover"
                width={100}
                height={100}
              />
              {/* Remove button */}
              <button
                type="button"
                onClick={() => {
                  setFiles((prevFiles) =>
                    prevFiles.filter((_, i) => i !== index),
                  );
                }}
                className="absolute top-[2px] right-[2px] z-10 rounded-full bg-red-500 p-1 text-white shadow ring-1 ring-white transition duration-150 hover:cursor-pointer hover:bg-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* send message form */}
      <form className="w-full" onSubmit={handleSendMessage}>
        <div className="flex flex-1 items-center rounded-md bg-gray-50 px-2 py-2 shadow-sm shadow-green-600/80">
          {/* File upload  */}
          <div className="mr-2 flex items-center">
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-gray-700 hover:text-gray-800"
            >
              {/* file icon */}
              <span>
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
                    d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                  />
                </svg>
              </span>
            </label>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              multiple
              accept="image/*,video/*,audio/*,application/pdf"
              onChange={(e) => {
                const newFiles = Array.from(e.target.files);
                setFiles((prevFiles) => {
                  const existing = new Set(
                    prevFiles.map((f) => f.name + f.size),
                  );
                  const uniqueNewFiles = newFiles.filter(
                    (f) => !existing.has(f.name + f.size),
                  );
                  return [...prevFiles, ...uniqueNewFiles];
                });
              }}
            />
          </div>

          {/* Text input */}
          <input
            type="text"
            name="message"
            placeholder="Your text here....."
            className="flex-1 bg-transparent text-[15px] placeholder:text-gray-500 focus:outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Send button */}
          <button
            disabled={text === "" && files?.length === 0}
            type="submit"
            className="ml-2 cursor-pointer rounded-full bg-green-600 p-2 text-white transition duration-200 hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-700/60"
          >
            {/* send icon */}
            <span>
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
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
