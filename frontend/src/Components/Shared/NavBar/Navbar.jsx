


import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import {
  FiSearch,
  FiMapPin,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiMoreHorizontal,
  FiLogOut,
  FiPackage,
  FiChevronRight,
  FiChevronDown,
} from "react-icons/fi";

//  CATEGORY DATA 

const navItems = [
  {
    name: "Honey",
    category: "honey",
    subCategories: [
      { name: "Sundarbans Natural Honey", slug: "sundarbans-natural-honey" },
      { name: "Natural Honeycomb Honey", slug: "natural-honeycomb-honey" },
      { name: "Black Seed Flower Honey", slug: "black-seed-flower-honey" },
      { name: "Mustard Flower Honey", slug: "mustard-flower-honey" },
      { name: "Litchi Flower Honey", slug: "litchi-flower-honey" },
      { name: "Sidr Honey", slug: "sidr-honey" },
      { name: "Combined Honey", slug: "combined-honey" },
    ],
  },
  {
    name: "Oil & Ghee",
    category: "oil-ghee",
    subCategories: [
      { name: "Ghee", slug: "ghee" },
      { name: "Mustard Oil", slug: "mustard-oil" },
      { name: "Olive Oil", slug: "olive-oil" },
      { name: "Coconut Oil", slug: "coconut-oil" },
      { name: "Black Seed Oil", slug: "black-seed-oil" },
      { name: "Neem Oil", slug: "neem-oil" },
      { name: "Castor Oil", slug: "castor-oil" },
      { name: "Hair Care Oil", slug: "hair-care-oil" },
      { name: "Massage Oil", slug: "massage-oil" },
    ],
  },
  {
    name: "Nuts & Dry Fruits",
    category: "nuts-dry-fruits",
    subCategories: [
      { name: "Honey Nuts", slug: "honey-nuts" },
      { name: "Dry Fruits", slug: "dry-fruits" },
      { name: "Golden Sweets", slug: "golden-sweets" },
      { name: "Date Barfi", slug: "date-barfi" },
    ],
  },
  {
    name: "Pickles",
    category: "pickles",
    subCategories: [
      { name: "Garlic Pickle", slug: "garlic-pickle" },
      { name: "Hog Plum Pickle", slug: "hog-plum-pickle" },
      { name: "Mango Pickle", slug: "mango-pickle" },
      { name: "Olive Pickle", slug: "olive-pickle" },
    ],
  },
  {
    name: "Healthy Foods & Powders",
    category: "healthy-foods-powders",
    subCategories: [
      { name: "Barley Sattu", slug: "barley-sattu" },
      { name: "Beetroot Powder", slug: "beetroot-powder" },
      { name: "Diet Powder", slug: "diet-powder" },
      { name: "Gastric Powder", slug: "gastric-powder" },
      { name: "Moringa Powder", slug: "moringa-powder" },
    ],
  },
  {
    name: "Vinegar",
    category: "vinegar",
    subCategories: [
      { name: "Apple Cider Vinegar", slug: "apple-cider-vinegar" },
    ],
  },
  {
    name: "Seeds",
    category: "seeds",
    subCategories: [
      { name: "Chia Seeds", slug: "chia-seeds" },
    ],
  },
  {
    name: "Spices",
    category: "spices",
    subCategories: [
      { name: "Black Seed (Kalojira)", slug: "black-seed" },
    ],
  },
];

const MotionDiv = motion.div;

const Navbar = ({
  user = null,
  cartCount = 0,
  wishlistCount = 0,
  onLogout,
}) => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openCategory, setOpenCategory] = useState(null);

  //  CLOSE MENUS ON ESCAPE 

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setProfileOpen(false);
        setMoreOpen(false);
        setOpenCategory(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  //  MOBILE SCROLL LOCK 

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  //  SEARCH 

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) return;

    navigate(`/shop?search=${encodeURIComponent(query)}`);

    setSearch("");
    setMenuOpen(false);
  };

  //  LOGOUT 

  const handleLogout = () => {
    onLogout?.();

    setProfileOpen(false);
    setMenuOpen(false);
  };

  //  CATEGORY ROUTES 

  const getCategoryPath = (category) => {
    return `/shop?category=${category}`;
  };

  const getSubCategoryPath = (category, subCategory) => {
    return `/shop?category=${category}&subCategory=${subCategory}`;
  };

  //  ACTION ITEMS 

  const actionItems = [
    {
      label: "Track Order",
      icon: FiMapPin,
      path: "/track-order",
    },
    {
      label: "Wishlist",
      icon: FiHeart,
      path: "/wishlist",
      count: wishlistCount,
    },
    {
      label: "Cart",
      icon: FiShoppingCart,
      path: "/cart",
      count: cartCount,
    },
  ];

  //  SEARCH BAR 

  const SearchBar = ({ mobile = false }) => (
    <form
      onSubmit={handleSearch}
      className={`flex items-center bg-[#F5F5F5] rounded-lg border border-transparent
        focus-within:border-orange-400 focus-within:bg-white
        transition-all duration-200
        ${mobile ? "w-full" : "w-full max-w-xl"}`}
    >
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className="w-full bg-transparent px-4 py-3 text-sm
          text-gray-800 outline-none placeholder:text-gray-400"
      />

      <button
        type="submit"
        aria-label="Search"
        className="px-4 text-gray-700 hover:text-[#F58220]
          transition-colors"
      >
        <FiSearch size={21} />
      </button>
    </form>
  );

  //  LOGO 

  const Logo = () => (
    <Link
      to="/"
      onClick={() => setMenuOpen(false)}
      className="flex items-center gap-2 shrink-0 group"
      aria-label="Bachai BD Home"
    >
      <span
        className="flex items-center justify-center w-11 h-11
          rounded-xl bg-[#FFF0E1] text-[#F58220]
          group-hover:bg-[#FFE4C7] transition-colors"
      >
        <img
          src="/logo.png"
          alt="Bachai BD Logo"
          className="w-full h-full object-contain"
        />
      </span>

      <span className="flex flex-col leading-tight">
        <span
          className="text-xl font-extrabold tracking-tight
            text-[#F58220]"
        >
          BACHAI BD
        </span>

        <span
          className="text-[9px] tracking-[2px]
            text-gray-500 font-medium"
        >
          NATURAL & HEALTHY
        </span>
      </span>
    </Link>
  );

  //  ACTION BUTTON 

  const ActionButton = ({ item }) => {
    const Icon = item.icon;

    return (
      <Link
        to={item.path}
        aria-label={item.label}
        className="relative flex flex-col items-center gap-1
          text-[#17212B] hover:text-[#F58220]
          transition-colors duration-200 group"
      >
        <span className="relative">
          <Icon
            size={23}
            strokeWidth={1.7}
            className="group-hover:scale-110 transition-transform"
          />

          {item.count > 0 && (
            <span
              className="absolute -top-2 -right-2
                min-w-[17px] h-[17px] px-1
                flex items-center justify-center
                rounded-full bg-[#F58220] text-white
                text-[10px] font-bold"
            >
              {item.count > 99 ? "99+" : item.count}
            </span>
          )}
        </span>

        <span className="text-xs font-medium whitespace-nowrap">
          {item.label}
        </span>
      </Link>
    );
  };

  //  DESKTOP CATEGORY ITEM 

  const DesktopCategory = ({ item }) => (
    <div className="relative group h-full flex items-center">
      <NavLink
        to={getCategoryPath(item.category)}
        className={({ isActive }) =>
          `flex items-center gap-1.5 h-full shrink-0
          text-[13px] xl:text-[14px] font-medium
          transition-colors duration-200
          group-hover:text-[#FFB36B]
          ${isActive ? "text-[#FFB36B]" : "text-white"}`
        }
      >
        {item.name}

        <FiChevronDown
          size={14}
          className="transition-transform duration-200
            group-hover:rotate-180"
        />
      </NavLink>

      {/* Desktop Dropdown */}

      <div
        className="absolute top-full left-0 pt-2
          opacity-0 invisible translate-y-2
          group-hover:opacity-100 group-hover:visible
          group-hover:translate-y-0
          group-focus-within:opacity-100
          group-focus-within:visible
          group-focus-within:translate-y-0
          transition-all duration-200 z-50"
      >
        <div
          className="w-[260px] bg-white rounded-xl
            shadow-xl border border-gray-100
            overflow-hidden"
        >
          <div className="px-4 py-3 bg-[#F8FAF8] border-b">
            <Link
              to={getCategoryPath(item.category)}
              className="flex items-center justify-between
                text-sm font-bold text-[#073B32]
                hover:text-[#F58220] transition-colors"
            >
              All {item.name}

              <FiChevronRight size={16} />
            </Link>
          </div>

          <div className="py-2 max-h-[350px] overflow-y-auto">
            {item.subCategories.map((sub) => (
              <Link
                key={sub.slug}
                to={getSubCategoryPath(item.category, sub.slug)}
                className="flex items-center justify-between
                  px-4 py-2.5 text-[13px]
                  text-gray-600 hover:text-[#F58220]
                  hover:bg-orange-50 transition-colors"
              >
                {sub.name}

                <FiChevronRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  //  COMPONENT RETURN 

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm font-sans">

      {/*  DESKTOP MAIN HEADER  */}

      <div className="hidden lg:block border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 xl:px-10">
          <div className="h-[94px] flex items-center justify-between gap-8">

            <Logo />

            {/* Search */}

            <div className="flex-1 flex justify-center">
              <SearchBar />
            </div>

            {/* Desktop Actions */}

            <div className="flex items-center gap-7 xl:gap-9">

              <ActionButton item={actionItems[0]} />

              {/* Account */}

              <div className="relative">
                {user ? (
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex flex-col items-center gap-1
                      text-gray-700 hover:text-[#F58220]"
                  >
                    <FiUser size={23} />
                    <span className="text-xs font-medium">
                      Account
                    </span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="flex flex-col items-center gap-1
                      text-gray-700 hover:text-[#F58220]"
                  >
                    <FiUser size={23} />
                    <span className="text-xs font-medium">
                      Sign In
                    </span>
                  </Link>
                )}

                <AnimatePresence>
                  {profileOpen && user && (
                    <MotionDiv
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-12 w-52
                        rounded-xl bg-white shadow-xl
                        border border-gray-100 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b">
                        <p className="font-semibold text-gray-800 text-sm">
                          {user.displayName || user.name || "My Account"}
                        </p>

                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-3
                          text-sm text-gray-700 hover:bg-orange-50"
                      >
                        <FiUser /> My Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2
                          px-4 py-3 text-sm text-red-500
                          hover:bg-red-50"
                      >
                        <FiLogOut /> Logout
                      </button>
                    </MotionDiv>
                  )}
                </AnimatePresence>
              </div>

              <ActionButton item={actionItems[1]} />
              <ActionButton item={actionItems[2]} />

              {/* More */}

              <div className="relative">
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="flex flex-col items-center gap-1
                    text-gray-700 hover:text-[#F58220]"
                >
                  <FiMoreHorizontal size={24} />
                  <span className="text-xs font-medium">More</span>
                </button>

                <AnimatePresence>
                  {moreOpen && (
                    <MotionDiv
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-12 w-48
                        rounded-xl bg-white shadow-xl
                        border border-gray-100 overflow-hidden"
                    >
                      {[
                        { label: "About Us", path: "/about" },
                        { label: "Contact Us", path: "/contact" },
                        { label: "Our Shop", path: "/shop" },
                      ].map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMoreOpen(false)}
                          className="block px-4 py-3 text-sm
                            text-gray-700 hover:bg-orange-50
                            hover:text-[#F58220]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </MotionDiv>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/*  DESKTOP CATEGORY NAVIGATION  */}

      <nav
        aria-label="Product categories"
        className="hidden lg:block bg-[#073B32] relative"
      >
        <div className="max-w-[1440px] mx-auto px-6 xl:px-10">
          <div
            className="h-[52px] flex items-center justify-between
              gap-4 xl:gap-6"
          >
            {navItems.map((item) => (
              <DesktopCategory
                key={item.category}
                item={item}
              />
            ))}
          </div>
        </div>
      </nav>

      {/*  MOBILE HEADER  */}

      <div className="lg:hidden">

        <div
          className="h-[68px] px-4 flex items-center
            justify-between gap-3 border-b border-gray-100"
        >
          {/* Hamburger */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="text-[#17212B] text-2xl
              hover:text-[#F58220] transition-colors"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

          <Logo />

          {/* Mobile Actions */}

          <div className="flex items-center gap-3">

            <Link
              to="/track-order"
              aria-label="Track order"
              className="text-[#17212B] hover:text-[#F58220]"
            >
              <FiMapPin size={21} />
            </Link>

            <Link
              to={user ? "/dashboard" : "/login"}
              aria-label="Account"
              className="text-[#17212B] hover:text-[#F58220]"
            >
              <FiUser size={21} />
            </Link>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="hidden sm:block text-[#17212B]
                hover:text-[#F58220]"
            >
              <FiHeart size={21} />
            </Link>

            <Link
              to="/cart"
              aria-label="Cart"
              className="relative text-[#17212B]
                hover:text-[#F58220]"
            >
              <FiShoppingCart size={22} />

              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2
                    bg-[#F58220] text-white text-[9px]
                    min-w-[16px] h-4 rounded-full
                    flex items-center justify-center px-1"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search */}

        <div className="px-4 py-3">
          <SearchBar mobile />
        </div>
      </div>

      {/*  MOBILE DRAWER  */}

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}

            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 top-[124px]
                bg-black/40 lg:hidden z-40"
            />

            {/* Drawer */}

            <MotionDiv
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed top-[124px] bottom-0 left-0
                w-[85%] max-w-[360px] bg-white
                shadow-2xl overflow-y-auto z-50 lg:hidden"
            >

              {/* Drawer Account */}

              <div className="bg-[#073B32] px-5 py-6 text-white">
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full
                        bg-white/15 flex items-center justify-center"
                    >
                      <FiUser size={23} />
                    </div>

                    <div>
                      <p className="font-semibold">
                        {user
                          ? user.displayName || user.name || "My Account"
                          : "Welcome to Bachai BD"}
                      </p>

                      <p className="text-xs text-white/70">
                        {user ? user.email : "Sign in to continue"}
                      </p>
                    </div>
                  </div>

                  {!user && (
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="text-sm bg-[#F58220]
                        px-3 py-2 rounded-lg"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </div>

              {/* Quick Links */}

              <div className="p-4 border-b">
                <p
                  className="text-xs font-bold uppercase
                    tracking-wider text-gray-400 mb-3"
                >
                  My Shopping
                </p>

                {[
                  { label: "Track Order", path: "/track-order", icon: FiPackage },
                  { label: "Wishlist", path: "/wishlist", icon: FiHeart },
                  { label: "Shopping Cart", path: "/cart", icon: FiShoppingCart },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between
                        py-3 text-sm text-gray-700
                        hover:text-[#F58220]"
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={19} />
                        {item.label}
                      </span>

                      <FiChevronRight />
                    </Link>
                  );
                })}
              </div>

              {/* Categories Accordion */}

              <div className="p-4">
                <p
                  className="text-xs font-bold uppercase
                    tracking-wider text-gray-400 mb-3"
                >
                  Shop by Category
                </p>

                <div className="divide-y divide-gray-100">
                  {navItems.map((item) => {
                    const isOpen = openCategory === item.category;

                    return (
                      <div key={item.category}>

                        {/* Category Header */}

                        <div className="flex items-center justify-between py-3">

                          <Link
                            to={getCategoryPath(item.category)}
                            onClick={() => setMenuOpen(false)}
                            className="flex-1 text-sm font-semibold
                              text-gray-800 hover:text-[#F58220]"
                          >
                            {item.name}
                          </Link>

                          <button
                            type="button"
                            aria-label={`Toggle ${item.name} subcategories`}
                            aria-expanded={isOpen}
                            onClick={() =>
                              setOpenCategory(
                                isOpen ? null : item.category
                              )
                            }
                            className="p-2 text-gray-500
                              hover:text-[#F58220] transition-colors"
                          >
                            <FiChevronDown
                              size={18}
                              className={`transition-transform duration-200
                                ${isOpen ? "rotate-180 text-[#F58220]" : ""}`}
                            />
                          </button>
                        </div>

                        {/* Subcategory List */}

                        <AnimatePresence>
                          {isOpen && (
                            <MotionDiv
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div
                                className="ml-3 pl-4 pb-3
                                  border-l-2 border-orange-100"
                              >
                                {item.subCategories.map((sub) => (
                                  <Link
                                    key={sub.slug}
                                    to={getSubCategoryPath(
                                      item.category,
                                      sub.slug
                                    )}
                                    onClick={() => {
                                      setMenuOpen(false);
                                      setOpenCategory(null);
                                    }}
                                    className="flex items-center justify-between
                                      py-2.5 text-[13px] text-gray-600
                                      hover:text-[#F58220]
                                      transition-colors"
                                  >
                                    {sub.name}

                                    <FiChevronRight size={14} />
                                  </Link>
                                ))}
                              </div>
                            </MotionDiv>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Account Links */}

              <div className="p-4 border-t">
                <Link
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-sm text-gray-600
                    hover:text-[#F58220]"
                >
                  About Us
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-sm text-gray-600
                    hover:text-[#F58220]"
                >
                  Contact Us
                </Link>

                {user && (
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-sm text-gray-600
                      hover:text-[#F58220]"
                  >
                    My Dashboard
                  </Link>
                )}

                {user && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2
                      py-3 text-sm text-red-500"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                )}
              </div>

            </MotionDiv>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
