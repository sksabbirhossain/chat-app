import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DropdownMenu = () => {
  const router = useRouter();

  //logout user
  const logout = async () => {
    const data = await signOut();
    toast.success("Logout successful");
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
        className="block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-green-50"
        onClick={logout}
      >
        Logout
      </p>
    </div>
  );
};

export default DropdownMenu;
