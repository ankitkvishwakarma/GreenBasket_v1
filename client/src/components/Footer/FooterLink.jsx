import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

const FooterLinks = ({ sections }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4"
    >
      {sections.map((section) => (
        <motion.div
          key={section.title}
          variants={itemVariants}
          className="space-y-5"
        >
          <h3 className="text-lg font-bold text-gray-900">
            {section.title}
          </h3>

          <ul className="space-y-3">
            {section.links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="group inline-flex items-center text-gray-600 transition-all duration-300 hover:text-green-600"
                >
                  <span className="mr-2 h-[2px] w-0 bg-green-600 transition-all duration-300 group-hover:w-4" />

                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FooterLinks;