import Image from "next/image";
import Link from "next/link";
import React from "react";

const SearchItem = ({ conversation }) => {
  return (
    <li
      key={conversation?._id}
      className="rounded-sm shadow shadow-green-800/20"
    >
      <Link
        href={`/message/${conversation?._id}`}
        className="group flex items-center gap-3 rounded-lg px-3 py-3 text-gray-900 transition-colors duration-300 hover:bg-green-600/10"
      >
        {/* Profile picture */}
        <Image
          src={
            conversation?.partner?.profilePic
              ? `${conversation?.partner.profilePic}`
              : "/default.jpg"
          }
          alt={conversation?.partner?.name}
          className="h-11 w-11 rounded-full object-cover p-0.5 ring-1 ring-green-600"
          width={100}
          height={100}
        />

        {/* Name + Last Message */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold capitalize">
            {conversation?.partner?.name}
          </p>
          <p className="truncate text-sm text-gray-500">
            {conversation?.lastMessage || "No messages yet"}
          </p>
        </div>

        {/* Timestamp */}
        <span className="text-[11px] text-gray-400">
          {conversation?.updatedAt
            ? formatDistanceToNow(new Date(conversation?.updatedAt), {
                addSuffix: true,
              })
            : ""}
        </span>
      </Link>
    </li>
  );
};

export default SearchItem;
