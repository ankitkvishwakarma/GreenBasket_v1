import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

/* =========================
   Social Media
========================= */

export const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
    color: "hover:bg-blue-600",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
    color: "hover:bg-pink-500",
  },
  {
    name: "X",
    href: "https://x.com",
    icon: FaXTwitter,
    color: "hover:bg-black",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: FaLinkedinIn,
    color: "hover:bg-blue-700",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: FaYoutube,
    color: "hover:bg-red-600",
  },
];

/* =========================
   Footer Sections
========================= */

export const footerSections = [
  {
    title: "Company",
    links: [
      {
        name: "About Us",
        path: "/about",
      },
      {
        name: "Careers",
        path: "/careers",
      },
      {
        name: "Blog",
        path: "/blog",
      },
      {
        name: "Contact",
        path: "/contact",
      },
    ],
  },

  {
    title: "Shop",
    links: [
      {
        name: "Shop",
        path: "/shop",
      },
      {
        name: "Categories",
        path: "/categories",
      },
      {
        name: "Offers",
        path: "/offers",
      },
      {
        name: "Track Order",
        path: "/orders",
      },
    ],
  },

  {
    title: "Support",
    links: [
      {
        name: "Help Center",
        path: "/help",
      },
      {
        name: "Privacy Policy",
        path: "/privacy-policy",
      },
      {
        name: "Terms & Conditions",
        path: "/terms-and-conditions",
      },
      {
        name: "Refund Policy",
        path: "/refund-policy",
      },
    ],
  },

  {
    title: "Legal",
    links: [
      {
        name: "Shipping Policy",
        path: "/shipping-policy",
      },
      {
        name: "Return Policy",
        path: "/return-policy",
      },
      {
        name: "Cookie Policy",
        path: "/cookie-policy",
      },
      {
        name: "FAQs",
        path: "/faq",
      },
    ],
  },
];

/* =========================
   Contact Information
========================= */

export const contactInfo = {
  address: "Ranchi, Jharkhand, India",
  phone: "+91 98765 43210",
  email: "support@greenbasket.com",
};

/* =========================
   Footer Description
========================= */

export const footerDescription =
  "GreenBasket delivers fresh fruits, vegetables, dairy products, and everyday essentials directly to your doorstep. Enjoy premium quality, fast delivery, and a healthy lifestyle with every order.";