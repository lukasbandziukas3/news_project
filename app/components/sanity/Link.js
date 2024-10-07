import CustomLink from "@/components/CustomLink";

export default function SanityLink(props) {
  const { value, text } = props;
  return <CustomLink href={value?.href}>{text}</CustomLink>;
}
