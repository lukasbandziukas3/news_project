import Link from "next/link";

export default function CustomLink(props) {
  const { href, children } = props;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link className="hover:underline" href={href} {...props}>
        {children}
      </Link>
    );
  } else {
    return (
      <Link {...props} className="hover:underline text-blue-600" target="_blank" rel="noopener noreferrer" href={href}>
        {children}
      </Link>
    );
  }
}
