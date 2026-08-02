import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

import Logo from "@/components/Navbar/Logo";
import SocialLinks from "./SocialLink";

const FooterTop = ({
  description,
  socialLinks,
  contactInfo,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
      className="grid gap-10 lg:grid-cols-[1.5fr_1fr]"
    >
      {/* Brand Section */}
      <div>
        <Logo />

        <p className="mt-5 max-w-xl text-gray-600 leading-7">
          {description}
        </p>

        <div className="mt-8">
          <SocialLinks socialLinks={socialLinks} />
        </div>
      </div>

      {/* Contact Section */}
      <div>
        <h3 className="mb-6 text-lg font-bold text-gray-900">
          Contact Us
        </h3>

        <div className="space-y-5">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-green-100 p-3 text-green-600">
              <MapPin size={20} />
            </div>

            <div>
              <p className="font-medium text-gray-900">
                Address
              </p>

              <p className="text-gray-600">
                {contactInfo.address}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-green-100 p-3 text-green-600">
              <Phone size={20} />
            </div>

            <div>
              <p className="font-medium text-gray-900">
                Phone
              </p>

              <a
                href={`tel:${contactInfo.phone}`}
                className="text-gray-600 hover:text-green-600"
              >
                {contactInfo.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-green-100 p-3 text-green-600">
              <Mail size={20} />
            </div>

            <div>
              <p className="font-medium text-gray-900">
                Email
              </p>

              <a
                href={`mailto:${contactInfo.email}`}
                className="text-gray-600 hover:text-green-600"
              >
                {contactInfo.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FooterTop;