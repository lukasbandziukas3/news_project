import Link from "next/link";
import { getMixPanelClient } from "@/utils/mixpanel";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const LandingNavMenuSection = ({
  scrollToSection,
}: {
  scrollToSection?: (sectionId: string) => void;
}) => {
  const mixpanel = getMixPanelClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      checkUserSession();
    });

    // Cleanup subscription on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkUserSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setIsLoggedIn(!!session);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav
        className={`flex flex-col md:flex-row md:justify-end items-center space-y-4 md:space-y-0 md:space-x-8 bg-white md:bg-transparent p-4 md:p-0`}
      >
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-4">
          {isLoggedIn ? (
            <>
              <Link
                href={"/profile"}
                className="w-full md:w-auto px-4 md:py-2 text-center text-black rounded-full transition-colors flex items-center justify-center"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full md:w-auto px-4 md:py-2 text-center md:bg-primary-600 text-black md:text-white rounded-full md:hover:bg-primary-700 transition-colors flex items-center justify-center"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/sign-in"
                onClick={() => {
                  mixpanel.track("goto.sign_in", {
                    $source: "landing.header",
                  });
                }}
                className="w-full md:w-auto px-4 md:py-2 text-center md:hover:text-primary-600 transition-colors md:border rounded-full flex items-center justify-center"
              >
                Sign In
              </Link>
              <Link
                href="/auth/sign-up"
                onClick={() => {
                  mixpanel.track("goto.sign_up", {
                    $source: "landing.header",
                  });
                }}
                className="w-full md:w-auto px-4 md:py-2 text-center md:bg-primary-600 text-black md:text-white rounded-full md:hover:bg-primary-700 transition-colors flex items-center justify-center"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default LandingNavMenuSection;
