import Link from "next/link";

export default function SanityAnchorHeader(props) {
  const { node, children, level } = props;
  const { _key } = node;
  const style = `text-${level}`;

  // Even though HTML5 allows id to start with a digit, we append it with a letter to avoid various JS methods to act up and make problems
  const headingId = children
    .join("")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "") // Remove leading and trailing dashes
    .toLowerCase();

  return (
    <p key={_key} className={`${style} text-black`}>
      <Link href={`#${headingId}`} aria-hidden="true" tabIndex={-1} className={"anchor"} />
      <>{children}</>
    </p>
  );
}
