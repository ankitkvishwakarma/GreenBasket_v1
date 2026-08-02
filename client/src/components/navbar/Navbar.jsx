import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Logo from "./Logo";
import LocationSelector from "./LocationSelector";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import CartButton from "./CartButton";
import WishlistButton from "./WishlistButton";
import NotificationButton from "./NotificationButton";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
    const { isAuthenticated = false } = useSelector(
        (state) => state.auth || {}
    );

    const [mobileOpen, setMobileOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [showNavLinks, setShowNavLinks] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setIsScrolled(currentScrollY > 20);

            if (currentScrollY <= 20) {
                setShowNavbar(true);
                setShowNavLinks(true);
            } else if (currentScrollY > lastScrollY) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
                setShowNavLinks(false);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{
                    y: showNavbar ? 0 : -120,
                }}
                transition={{
                    duration: 0.35,
                    ease: "easeInOut",
                }}
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isScrolled
                        ? `
      bg-gradient-to-r
      from-[#F5FFF6]
      via-[#ECFDF3]
      to-[#E6F9EC]
      border-b border-green-200
      shadow-md
    `
                        : `
      bg-gradient-to-r
      from-[#F9FFF9]
      via-[#F2FFF5]
      to-[#ECFDF3]
    `
                    }`}
            >
                <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">

                    {/* ================= TOP BAR ================= */}

                    <div className="flex h-[72px] items-center justify-between">

                        {/* Left */}

                        <div className="flex shrink-0 items-center gap-4 xl:gap-5">

                            <Logo />

                            <div className="hidden xl:block">
                                <LocationSelector />
                            </div>

                        </div>

                        {/* Search */}

                        <div className="hidden flex-1 justify-center px-6 lg:flex xl:px-10">

                            <SearchBar />

                        </div>

                        {/* Right */}

                        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">

                            {/* Wishlist */}

                            {isAuthenticated && (
                                <WishlistButton count={0} />
                            )}

                            {/* Cart */}

                            <CartButton count={0} />

                            {/* Notifications */}

                            {isAuthenticated && (
                                <NotificationButton count={0} />
                            )}

                            {/* Login / Profile */}

                            {isAuthenticated ? (
                                <ProfileDropdown />
                            ) : (
                                <Link
                                    to="/login"
                                    className="
                    rounded-xl
                    bg-gradient-to-r
                    from-green-600
                    to-emerald-500
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-xl
                    hover:from-green-700
                    hover:to-emerald-600
                  "
                                >
                                    Login
                                </Link>
                            )}

                        </div>

                        {/* Mobile */}

                        <div className="lg:hidden">
                            <MobileMenu
                                open={mobileOpen}
                                setOpen={setMobileOpen}
                            />
                        </div>

                    </div>

                    {/* ================= NAVIGATION ================= */}

                    <motion.div
                        initial={false}
                        animate={{
                            height: showNavLinks ? "48px" : "0px",
                            opacity: showNavLinks ? 1 : 0,
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                        className="overflow-hidden"
                    >
                        <div className="flex h-12 items-center justify-center">
                            <NavLinks />
                        </div>
                    </motion.div>

                </div>

            </motion.header>
            {/* Spacer */}

            <div
                className={`transition-all duration-300 ${showNavLinks ? "h-[120px]" : "h-[72px]"
                    }`}
            />
        </>
    );
};

export default Navbar;