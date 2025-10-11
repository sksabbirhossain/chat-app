const DropdownMenu = () => {
  return (
    <div className="absolute top-3 -right-3">
      <div className="absolute top-8 right-0 z-10 w-48 rounded-md bg-white p-2 shadow-lg">
        <p className="block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
          View Profile
        </p>
        <p className="block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
          Mute Notifications
        </p>
        <p className="block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
          Block User
        </p>
        <p className="block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
          Delete Conversation
        </p>
      </div>
    </div>
  );
};

export default DropdownMenu;
