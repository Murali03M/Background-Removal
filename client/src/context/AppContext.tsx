import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AppContextType {
  credit: number;
  setCredit: (credit: number) => void;
  image: File | null;
  setImage: (image: File) => void;
  resultImage: string | null;
  setResultImage: (image: string) => void;
  loadCreditsData: () => Promise<void>;
  removeBackground: (file: File) => void;
}

export const appContext = createContext<AppContextType | null>(null);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [credit, setCredit] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null); // Result as base64 string
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate(); // Corrected typo

  const loadCreditsData = async () => {
    try {
      const token = await getToken();
      if (!token) {
        throw new Error("No token found");
      }     

      const response = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCredit(response.data.credit);
      } else {
        throw new Error("Failed to load credits data");
      }
    } catch (error) {
      console.error("Error loading credits:", error);
      throw new Error("Failed to load credits data");
    }
  };

  const removeBackground = async (image: File) => {
    try {
      if (!isSignedIn) {
        openSignIn();
        return;
      }

      console.log("cgfbkhlxcfjbxcnfghjbvnxckhjf");


      setImage(image);
      navigate('/result'); 

      const token = await getToken();

      const formData = new FormData();
      formData.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/image/remove-bg`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!data) {
        throw new Error("Failed to remove background");
      }

      setResultImage(data.resultImage);

      console.log(data);
      

      if (data.creditBalance==0) {
        navigate('/buy')
      }

      setCredit(data.creditBalance);
    
    } catch (error) {
      console.error("Error removing background:", error);
      throw new Error("Failed to remove background");
    }
  };

  const value: AppContextType = {
    credit,
    setCredit,
    loadCreditsData,
    image,
    setImage,
    removeBackground,
    resultImage,
    setResultImage
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppContextProvider;
