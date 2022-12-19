import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Loading } from "@/components/screens";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<Loading />}>
      <AuthProvider>
        <ChakraProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </ChakraProvider>
      </AuthProvider>
    </React.Suspense>
  );
};
