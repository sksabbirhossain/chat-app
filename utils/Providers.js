import { SidebarProvider } from "@/contexts/sidebarContext";
import { ToastContainer } from "react-toastify";

const Providers = ({ children }) => {
  return (
    <SidebarProvider>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </SidebarProvider>
  );
};

export default Providers;
