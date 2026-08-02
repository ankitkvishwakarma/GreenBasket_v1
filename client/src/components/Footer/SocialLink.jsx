import { motion } from "framer-motion";

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
    y: 15,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

const SocialLinks = ({ socialLinks }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex flex-wrap items-center gap-3"
    >
      {socialLinks.map((social) => {
        const Icon = social.icon;

        return (
          <motion.a
            key={social.name}
            variants={itemVariants}
            whileHover={{
              y: -6,
              scale: 1.08,
            }}
            whileTap={{ scale: 0.95 }}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className={`
              group
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-green-100
              bg-white
              shadow-sm
              transition-all
              duration-300
              hover:border-transparent
              hover:shadow-xl
              ${social.color}
            `}
          >
            <Icon
              size={22}
              className="text-gray-600 transition-colors duration-300 group-hover:text-white"
            />
          </motion.a>
        );
      })}
    </motion.div>
  );
};

export default SocialLinks;