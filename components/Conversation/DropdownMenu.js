import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const DropdownMenu = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //logout user
  const logout = async () => {
    setLoading(true);
    const data = await signOut();
    toast.success("Logout successful");
    setLoading(false);
    router.push("/");
  };

  return (
    <>
      {/* user profile Menu items */}
      <p className="block w-full cursor-pointer rounded-md px-2 py-1 text-left text-sm text-gray-700 hover:bg-green-50">
        View Profile
      </p>
      <p className="block w-full cursor-pointer rounded-md px-2 py-1 text-left text-sm text-gray-700 hover:bg-green-50">
        Settings
      </p>
      <p
        className={`block w-full cursor-pointer rounded-md px-2 py-1 text-left text-sm text-gray-700 hover:bg-green-50 ${
          loading ? "cursor-wait opacity-70" : ""
        }`}
        onClick={logout}
      >
        Logout
      </p>
    </>
  );
};

export default DropdownMenu;
