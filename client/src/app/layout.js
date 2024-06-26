"use client";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import ReduxProvider from "@/redux/reduxProvider";
import { SessionProvider } from "next-auth/react";

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <SessionProvider session={session}>
            {children}
            <Toaster
              position="top-right"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 2500,
                },
                error: {
                  duration: 4000,
                },
                style: {
                  fontSize: "16px",
                  maxWidth: "500px",
                  padding: "16px 24px",
                },
              }}
            />
          </SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
