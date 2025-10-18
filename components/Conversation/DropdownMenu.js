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
    <div className="shadowP absolute -top-36 -right-3 z-10 w-48 rounded-md border border-gray-100 bg-white p-2">
      {/* user profile Menu items */}
      <p className="block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-green-50">
        View Profile
      </p>
      <p className="block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-green-50">
        Settings
      </p>
      <p
        className={`block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-green-50 ${
          loading ? "cursor-wait opacity-70" : ""
        }`}
        onClick={logout}
      >
        Logout
      </p>
    </div>
  );
};

export default DropdownMenu;
