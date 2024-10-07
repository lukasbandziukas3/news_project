import Logo from "../Logo";
import LandingNavMenuSection from "./NavMenu";

const LandingHeaderSection = ({
  isMenuOpen,
  toggleMenu,
  scrollToSection,
  isScrolled = false, // Add this line
}: {
  isMenuOpen?: boolean;
  toggleMenu?: () => void;
  scrollToSection?: (sectionId: string) => void;
  isLandingPage?: boolean;
  isTransparent?: boolean;
  headerBackground?: string;
  isScrolled?: boolean; // Add this line
}) => {
  return (
    <>
      <header
        className={`py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-white`}
      >
        <div className="flex flex-wrap justify-between items-center px-4">
          <Logo onClick={() => {}} withIcon />

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
          <div className="hidden md:block flex-grow">
            <LandingNavMenuSection />
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden w-full">
            <LandingNavMenuSection />
          </div>
        )}
      </header>
    </>
  );
};

export default LandingHeaderSection;
