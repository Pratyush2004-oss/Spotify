import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
const AuthProvider = ({children}:{children: React.ReactNode}) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const {checkAdminStatus} = useAuthStore();
  const {initSocket, disconnectSocket} = useChatStore();
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if(token){
          await checkAdminStatus();
          // init socket
          if(userId){
            initSocket(userId);
          }
        }
      } catch (error) {
        updateApiToken(null);
        console.log("Error in auth Provider " + error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // cleanup 
    return () => {
      disconnectSocket();
    }
  }, [getToken, userId, checkAdminStatus, initSocket, disconnectSocket]);

  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 className="size-16 animate-spin text-emerald-500" />
      </div>
    );
  return <>{children}</>;
};

export default AuthProvider;
