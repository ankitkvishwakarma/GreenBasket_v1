// import { NavLink } from "react-router-dom";
// import { motion } from "framer-motion";

// const navItems = [
//   {
//     name: "Home",
//     path: "/",
//   },
//   {
//     name: "Shop",
//     path: "/shop",
//   },
//   {
//     name: "Categories",
//     path: "/categories",
//   },
//   {
//     name: "Offers",
//     path: "/offers",
//   },
//   {
//     name: "About",
//     path: "/about",
//   },
//   {
//     name: "Contact",
//     path: "/contact",
//   },
// ];

// const NavLinks = () => {
//   return (
//     <nav className="hidden items-center gap-2 xl:gap-3 lg:flex">
//       {navItems.map((item) => (
//         <NavLink key={item.name} to={item.path}>
//           {({ isActive }) => (
//             <motion.div
//               whileHover={{ y: -2 }}
//               whileTap={{ scale: 0.98 }}
//               transition={{ duration: 0.2 }}
//               className="relative"
//             >
//               <span
//                 className={`
//                   relative
//                   flex
//                   items-center
//                   rounded-xl
//                   px-4
//                   py-2
//                   text-sm
//                   font-semibold
//                   transition-all
//                   duration-300
//                   ${isActive
//                     ? "bg-white/20 text-white backdrop-blur-xl shadow-sm dark:bg-green-900/20"
//                     : "text-gray-700 hover:text-green-600 dark:text-black-200 dark:hover:bg-neutral-800"
//                   }
//                 `}
//               >
//                 {item.name}
//               </span>

//               {isActive && (
//                 <motion.div
//                   layoutId="navbar-indicator"
//                   transition={{
//                     type: "spring",
//                     stiffness: 450,
//                     damping: 35,
//                   }}
//                   className="
//                     absolute
//                     bottom-0
//                     left-3
//                     right-3
//                     h-1
//                     rounded-full
//                     bg-gradient-to-r
//                     from-green-500
//                     to-emerald-500
//                   "
//                 />
//               )}
//             </motion.div>
//           )}
//         </NavLink>
//       ))}
//     </nav>
//   );
// };

// export default NavLinks;

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Categories", path: "/categories" },
  { name: "Offers", path: "/offers" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const NavLinks = () => {
  return (
    <nav className="hidden lg:flex items-center gap-6">
      {navItems.map((item) => (
        <NavLink key={item.name} to={item.path}>
          {({ isActive }) => (
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative group"
            >
              <span
                className={`relative flex items-center px-1 py-2 text-sm font-semibold transition-colors duration-300 ${
                  isActive
                    ? "text-green-600"
                    : "text-black-700 hover:text-green-600 dark:text-black-300 dark:hover:text-green-500"
                }`}
              >
                {item.name}
              </span>

              <motion.div
                className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-full bg-green-500 origin-left"
                initial={false}
                animate={{
                  scaleX: isActive ? 1 : 0,
                }}
                whileHover={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavLinks;