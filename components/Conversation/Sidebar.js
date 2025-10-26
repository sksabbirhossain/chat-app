"use client";
import { getSearchConversations } from "@/actions/conversation/conversationActions";
import { socket } from "@/configs/socket";
import useSidebarMenu from "@/contexts/sidebarContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import ConversationItem from "./ConversationItem";
import DropdownMenu from "./DropdownMenu";
import NewConversationModal from "./NewConversationModal";
import SearchItem from "./SearchItem";

// Utility debounce function
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

const Sidebar = () => {
  const { openSidebar } = useSidebarMenu();
  const [openModal, setOpenModal] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [searchConversations, setSearchConversations] = useState([]);
  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState({});
  const [searchErrors, setSearchErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const fetchedRef = useRef(false);

  // get login user session
  const { data: session, status } = useSession();
  const userInfo = session?.user;

  const pathname = usePathname();

  const modalMenuRef = useRef(null);
  const modalButtonRef = useRef(null);

  // control modal dropdown for start new conversation
  useEffect(() => {
    function handleClickOutside(event) {
      // if click is outside both dropdown and button, close menu
      if (
        modalMenuRef.current &&
        !modalMenuRef.current.contains(event.target) &&
        !modalButtonRef.current.contains(event.target)
      ) {
        setOpenModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  // Notify server about online user
  useEffect(() => {
    socket.emit("joinOnline", userInfo?._id);
  }, [userInfo]);

  // Listen for conversation updates
  useEffect(() => {
    socket.on("updateConversation", (data) => {
      // Update the conversation list
      setConversations((prev) => {
        const updated = prev.map((conv) => {
          if (conv?._id === data?.conversationId) {
            return {
              ...conv,
              lastMessage: data.text || "📎 File",
              updatedAt: new Date(),
            };
          }
          return conv;
        });

        // Move updated conversation to top
        return updated.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
        );
      });

      // If the conversation is not in the list, add it
      if (!conversations.find((c) => c._id === data?.conversationId)) {
        setConversations((prev) => [data?.conversation, ...prev]);
      }
    });

    return () => socket.off("updateConversation");
  }, [conversations]);

  // Fetch conversation for current user
  useEffect(() => {
    if (fetchedRef.current) return;
    if (status !== "authenticated") return;
    if (!session?.user?._id) return;

    fetchedRef.current = true;

    // get conversations api call
    const getConversations = async () => {
      setLoading(true);
      setErrors({});
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/conversations/${userInfo?._id}`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
          },
        );

        const data = await res.json();

        if (data?.data) {
          setConversations(data.data);
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

    getConversations();
  }, [userInfo, session, status]);

  //get search conversatons handler
  const fetchConversations = async (search) => {
    setSearchLoading(true);
    setSearchErrors({});
    if (!search.trim()) {
      setSearchLoading(false);
      setSearchConversations([]); // clear if input empty
      return;
    }

    try {
      const data = await getSearchConversations(search);

      if (data?.data) {
        setSearchConversations(data?.data);
        setSearchLoading(false);
        setSearchErrors({});
      } else {
        setSearchLoading(false);
        setSearchErrors(data);
      }
    } catch (err) {
      setSearchLoading(false);
      setSearchErrors({
        errors: {
          common: {
            msg: err.massage,
          },
        },
      });
    }
  };

  // Debounced version of fetchConversations
  const getConversationHandler = useCallback(
    debounce((value) => {
      fetchConversations(value);
    }, 500), // 500ms debounce
    [],
  );

  // Trigger debounce whenever query changes
  useEffect(() => {
    getConversationHandler(query);
  }, [query, getConversationHandler]);

  return (
    <>
      {/* sidebar conversation */}
      <aside
        className={`fixed h-screen w-64 -translate-x-full overflow-hidden rounded-lg transition-transform sm:h-[99vh] sm:translate-x-0 ${openSidebar ? "translate-x-0" : ""}`}
      >
        <div className="h-full bg-white shadow-md">
          <div className="sidebar h-full w-full overflow-y-auto">
            {/* Search conversations */}
            <div className="fixed top-0 left-0 z-10 w-full max-w-md bg-white">
              {/* search input */}
              <div className="relative border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search a conversation..."
                  name={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full py-[18px] pr-4 pl-10 shadow-green-500/20 placeholder:text-[14px] focus:shadow-sm focus:outline-none"
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

              {/* showing search items */}
              {searchConversations && (
                <div className="h-full w-full">
                  {/* showing loading */}
                  {searchLoading && (
                    <span className="flex items-center justify-center py-2 text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-6 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 6l0 -3" />
                        <path d="M16.25 7.75l2.15 -2.15" />
                        <path d="M18 12l3 0" />
                        <path d="M16.25 16.25l2.15 2.15" />
                        <path d="M12 18l0 3" />
                        <path d="M7.75 16.25l-2.15 2.15" />
                        <path d="M6 12l-3 0" />
                        <path d="M7.75 7.75l-2.15 -2.15" />
                      </svg>
                    </span>
                  )}
                  {/* showing errors */}
                  {searchErrors?.errors?.common && (
                    <p className="p-4 text-center text-sm font-semibold text-red-600">
                      {searchErrors.errors.common.msg}
                    </p>
                  )}
                  {/* show search results */}
                  <ul className="search-scroll h-full max-h-[350px] w-full space-y-0.5 overflow-y-auto border-b border-gray-300 bg-gray-100 px-1 shadow-md">
                    {searchConversations?.map((conversation) => (
                      <SearchItem
                        key={conversation?._id}
                        conversation={conversation}
                        setSearchConversations={setSearchConversations}
                        setQuery={setQuery}
                        setConversations={setConversations}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Conversation List */}
            <div className="pt-[65px]">
              <ul className="space-y-0.5 px-0.5 font-medium">
                {/* showing loading */}
                {loading && (
                  <span className="flex items-center justify-center p-0.5 text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-6 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 6l0 -3" />
                      <path d="M16.25 7.75l2.15 -2.15" />
                      <path d="M18 12l3 0" />
                      <path d="M16.25 16.25l2.15 2.15" />
                      <path d="M12 18l0 3" />
                      <path d="M7.75 16.25l-2.15 2.15" />
                      <path d="M6 12l-3 0" />
                      <path d="M7.75 7.75l-2.15 -2.15" />
                    </svg>
                  </span>
                )}
                {/* showing error */}
                {errors?.errors?.common && (
                  <p className="p-4 text-center text-sm font-semibold text-red-600">
                    {errors.errors.common.msg}
                  </p>
                )}

                {/* show all conversations */}
                {conversations?.map((conversation) => (
                  <ConversationItem
                    key={conversation?._id}
                    conversation={conversation}
                    currentUserId={userInfo?._id}
                    isActive={
                      pathname === `/message/${conversation?._id}`
                        ? true
                        : false
                    }
                  />
                ))}
              </ul>
            </div>

            {/* login user info */}
            <div className="shadow-3xl fixed bottom-0 z-20 flex h-[55px] w-full items-center justify-between border-t border-gray-300 bg-[#ffffff] px-4">
              {/* user info */}
              <div className="flex items-center gap-2">
                <Image
                  src={"/default.jpg"}
                  alt={"profile"}
                  className="line-clamp-1 h-8 w-8 rounded-full object-cover p-0.5 ring-1 ring-green-600"
                  width={100}
                  height={100}
                />
                <h2 className="text-[15px] font-medium capitalize select-none">
                  {userInfo?.name}
                </h2>
              </div>

              {/* more info */}
              <div className="relative">
                <p
                  className="cursor-pointer select-none"
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

                {/* Dropdown menu   */}
                {menuOpen && (
                  <div
                    ref={menuRef}
                    className="absolute -top-[118px] -right-3 z-20 w-36 rounded-md bg-white p-2 shadow"
                  >
                    <DropdownMenu />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* create a new conversation button  */}
          <div className="fixed right-3 bottom-16 z-10">
            <button
              ref={modalButtonRef}
              title="New Message"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-green-700 shadow-lg transition-all duration-200 ease-in-out hover:bg-green-800"
              onClick={() => setOpenModal((prev) => !prev)}
            >
              {/* icon */}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* New Conversation Modal */}
      {openModal && (
        <div
          ref={modalMenuRef}
          className="absolute left-3 z-20 flex items-center justify-center sm:bottom-14 sm:left-[260px]"
        >
          <NewConversationModal setConversations={setConversations} />
        </div>
      )}
    </>
  );
};

export default Sidebar;
