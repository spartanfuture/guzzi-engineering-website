import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SocialLinks = ({ mobile }: { mobile?: boolean }) => {
  return (
    <div className={`${mobile ? "flex" : "hidden lg:flex"} space-x-4`}>
      {[
        {
          icon: faFacebookF,
          href: "https://www.facebook.com/spartanfutureofficial",
          label: "Facebook",
        },
        {
          icon: faInstagram,
          href: "https://www.instagram.com/spartanfutureofficial",
          label: "Instagram",
        },
        {
          icon: faEnvelope,
          href: "mailto:support@spartanfuture.com",
          label: "Email",
        },
        { icon: faPhone, href: "tel:+61435638590", label: "Phone" },
      ].map((item, index) => (
        <a
          key={index}
          href={item.href}
          target="_blank"
          className="text-white hover:text-blue-400 transition duration-300 transform hover:scale-110"
          aria-label={item.label}
        >
          <FontAwesomeIcon icon={item.icon} size="sm" />
        </a>
      ))}
    </div>
  );
};
