import {
  footerDescription,
  footerSections,
  socialLinks,
  contactInfo,
} from "./footerData";

import FooterTop from "./FooterTop";
import FooterLinks from "./FooterLink";
// import Newsletter from "./Newsletter";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-16 lg:px-8">

        {/* Newsletter */}
        {/* <Newsletter /> */}

        {/* Top Section */}
        <div className="mt-16">
          <FooterTop
            description={footerDescription}
            socialLinks={socialLinks}
            contactInfo={contactInfo}
          />
        </div>

        {/* Divider */}
        <div className="my-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Footer Links */}
        <FooterLinks sections={footerSections} />

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-gray-200 pt-8 md:flex-row">

          <p className="text-center text-sm text-gray-500 md:text-left">
            © {currentYear} GreenBasket. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">

            <span className="transition hover:text-green-600">
              Privacy Policy
            </span>

            <span className="transition hover:text-green-600">
              Terms & Conditions
            </span>

            <span className="transition hover:text-green-600">
              Cookie Policy
            </span>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;