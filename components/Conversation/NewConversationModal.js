"use client";
import { getSearchConversations } from "@/actions/conversation/conversationActions";
import { useCallback, useEffect, useState } from "react";
import UserItem from "./UserItem";

// debounce helper
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

const NewConversationModal = ({ setConversations }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // fetch users (like conversation search but showing users)
  const fetchUsers = async (search) => {
    setLoading(true);
    setErrors({});
    if (!search.trim()) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    try {
      const data = await getSearchConversations(search);
      if (data?.data) {
        setSearchResults(data.data);
      } else {
        setErrors({ common: "No user found" });
      }
    } catch (err) {
      setErrors({ common: "Server error" });
    } finally {
      setLoading(false);
    }
  };

  // debounce search
  const handleSearch = useCallback(
    debounce((value) => {
      fetchUsers(value);
    }, 400),
    [],
  );

  // run on query change
  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  return (
    <div className="flex items-center justify-center">
      <div className="w-[300px] rounded-xl bg-gray-50 p-4 shadow-lg">
        <div>
          <h2 className="text-md pb-3 font-medium text-gray-600">
            Start a new conversation
          </h2>
        </div>

        {/* Search input */}
        <div>
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-green-600 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          {/* Loading state */}
          {loading && (
            <div className="flex justify-center text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-3 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="4" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
            </div>
          )}

          {/* Error */}
          {errors?.common && (
            <p className="py-3 text-center text-sm text-red-500">
              {errors.common.msg}
            </p>
          )}
        </div>

        {/* Search results */}
        <ul className="search-scroll mt-3 h-64 max-w-sm space-y-1 overflow-y-auto">
          {searchResults.map((user) => (
            <UserItem
              user={user}
              key={user?._id}
              setQuery={setQuery}
              setConversations={setConversations}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewConversationModal;
