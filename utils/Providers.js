import { SidebarProvider } from "@/contexts/sidebarContext";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

const Providers = ({ children }) => {
  return (
    <SessionProvider>
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
    </SessionProvider>
  );
};

export default Providers;
