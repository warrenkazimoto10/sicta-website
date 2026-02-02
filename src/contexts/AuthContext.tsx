import { createContext, useContext, useState, ReactNode } from "react";
import { User, Company, LoginCredentials } from "@/types/espacePro";

interface AuthContextType {
  user: User | null;
  company: Company | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock data
      const mockUser: User = {
        id: "1",
        companyId: "1",
        email: credentials.email,
        nom: "Doe",
        prenom: "John",
        role: "admin",
        actif: true,
        dateCreation: new Date().toISOString(),
      };

      const mockCompany: Company = {
        id: "1",
        nom: "Entreprise Demo",
        email: "contact@demo.com",
        telephone: "0102030405",
        nombreVehicules: 15,
        dateCreation: new Date().toISOString(),
        actif: true,
      };

      setUser(mockUser);
      setCompany(mockCompany);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setCompany(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        company,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
