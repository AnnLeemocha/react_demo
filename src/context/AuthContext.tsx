import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

interface UserType {
  id: number;
  name: string;
}

interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<UserType | null>(null);

  // 初始化：從 localStorage 載入使用者資料
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUserState(JSON.parse(savedUser));
    }
  }, []);

  // 更新使用者資料並同步 localStorage
  const setUser = (newUser: UserType | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// --------------------
// 自訂 Hook（方便使用）
// --------------------
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser 必須在 UserProvider 內使用");
  }
  return context;
};
