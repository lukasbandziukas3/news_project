import CustomLink from "./CustomLink";

export default function SanityLink(props) {
  const { value, text } = props;
  return <CustomLink href={value?.href}>{text}</CustomLink>;
}
