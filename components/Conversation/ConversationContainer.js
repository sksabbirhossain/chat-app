import { getSearchConversations } from "@/actions/conversation/conversationActions";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConversationItem from "./ConversationItem";
import SearchItem from "./SearchItem";

// Utility debounce function
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

const ConversationContainer = () => {
  const [conversations, setConversations] = useState([]);
  const [searchConversations, setSearchConversations] = useState([]);
  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState({});
  const [searchErrors, setSearchErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // get login user session
  const { data: session } = useSession();
  const userInfo = session?.user;

  const router = useRouter();

  // Fetch conversation for current user
  useEffect(() => {
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

    if (userInfo?._id) getConversations();
  }, [userInfo, session]);

  //get search conversatons handler
  const fetchConversations = async (search) => {
    setSearchErrors({});
    if (!search.trim()) {
      setSearchConversations([]); // clear if input empty
      return;
    }

    try {
      const data = await getSearchConversations(search);

      if (data?.data) {
        setSearchConversations(data?.data);
      } else {
        setSearchErrors(data);
      }
    } catch (err) {
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

  //logout user
  const logout = async () => {
    const data = await signOut();
    toast.success("Logout successful");
    router.push("/");
  };

  return (
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

        {/* showing search items */}
        {searchConversations && (
          <div className="h-full w-full">
            <ul className="h-full max-h-[350px] w-full space-y-1 overflow-y-auto border-b border-gray-300 bg-gray-100 px-1 shadow-md">
              {searchConversations?.map((conversation) => (
                <SearchItem
                  // conversation={conversation}
                  key={conversation?._id}
                  conversation={conversation}
                  setSearchConversations={setSearchConversations}
                  setQuery={setQuery}
                />
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Conversation List */}
      <div className="pt-[65px]">
        <ul className="space-y-2 px-0.5 font-medium">
          {/* showing loading */}
          {loading && (
            <p className="p-4 text-center text-lg font-semibold text-green-600">
              Loading...
            </p>
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
              key={conversation._id}
              conversation={conversation}
              currentUserId={userInfo?._id}
            />
          ))}
        </ul>
      </div>

      {/* logout user */}
      <div
        className="shadow-3xl fixed bottom-0 flex h-[65px] w-full cursor-pointer items-center border-t border-gray-300 bg-[#ffffff] px-4"
        onClick={logout}
      >
        <div className="flex items-center gap-2">
          <Image
            src={"/default.jpg"}
            alt={"profile"}
            className="h-10 w-10 rounded-full object-cover p-0.5 ring-1 ring-purple-600"
            width={100}
            height={100}
          />
          <h2 className="text-md font-semibold capitalize">{userInfo?.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default ConversationContainer;
