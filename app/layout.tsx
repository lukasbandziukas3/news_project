"use client";

import { PrelineScript } from "./components";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import ToastProvider from "@/contexts/toastContext";
import AuthProvider from "@/contexts/AuthProvider";
import LandingHeaderSection from "./components/landing/Header";
import { usePathname } from "next/navigation";

const ToastContainerConfig = {
  closeOnClick: true,
  draggable: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  autoClose: 3000,
  hideProgressBar: true,
  newestOnTop: false,
  position: "top-right" as const,
  theme: "colored" as const,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isOnboardingPage = pathname === "/onboarding";

  return (
    <html lang="en">
      <body className="text-black">
        <AuthProvider>
          <ToastProvider>
            <ToastContainer {...ToastContainerConfig} />
            <div className="flex h-full min-h-screen flex-col items-center justify-between bg-white">
              {!isOnboardingPage && <LandingHeaderSection />}
              {children}
            </div>
          </ToastProvider>
        </AuthProvider>
      </body>
      <PrelineScript />
    </html>
  );
}
