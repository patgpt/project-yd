export default defineAppConfig({
  title: "Yellowdog Digital",
  description: "Your digital partner for success",
  navigation: [
    {
      title: "Home",
      icon: "mdi-home",
      to: "/",
      image: "/home.png",
    },
    {
      title: "About",
      icon: "mdi-information",
      to: "/about",
      image: "/about.png",
    },
    {
      title: "Blog",
      icon: "mdi-blog",
      to: "/blog",
      image: "/blog.png",
    },
    {
      title: "Services",
      icon: "mdi-briefcase",
      to: "/services",
      image: "/services.png",
    },
    {
      title: "Contact",
      icon: "mdi-contact-mail",
      to: "/contact",
      image: "/contact.png",
    },
  ],
  socialMedia: {
    title: "Follow Us",
    description: "Stay connected with us on social media",
    links: [
      {
        platform: "facebook",
        icon: "mdi-facebook",
        link: "https://www.facebook.com/yellowdogdigital",
      },
      {
        platform: "twitter",
        icon: "mdi-twitter",
        link: "https://x.com/yellowdogdigi",
      },
      {
        platform: "linkedin",
        icon: "mdi-linkedin",
        link: "https://linkedin.com/company/yellowdogdigital",
      },
      {
        platform: "instagram",
        icon: "mdi-instagram",
        link: "https://instagram.com/yellowdogdigital",
      },
      {
        platform: "github",
        icon: "mdi-github",
        link: "https://github.com/yellowdogdigital",
      },
    ],
  },
  footer: {
    copyright: "Made with ❤️ in Canada 🇨🇦 © 2023 Yellowdog Digital",
    links: [
      {
        title: "Privacy Policy",
        to: "/privacy",
      },
      {
        title: "Terms of Service",
        to: "/terms",
      },
    ],
    contact: {
      email: "hey@yellowdog.digital",
    },
    logoLeft: {
      src: "/brand/yellowdog-sticker.webp",
      alt: "Yellowdog Digital Logo Left",
    },
    logoRight: {
      src: "/brand/yellowdog-japanese-sticker.webp",
      alt: "Yellowdog Digital Logo Right",
    },
  },
});
