import SanityAnchorHeader from "./AnchorHeader";
import SanityImage from "./Image";
import SanityLink from "./Link";
import { PortableText } from "@portabletext/react";

export default function SanityContent(props) {
  const { content } = props;
  const components = {
    block: (props) => {
      if (props.node.style === "normal" && props.children[0] === "") {
        return <p>&nbsp;</p>;
      }
      switch (props.node.style) {
        case "h1":
          return <SanityAnchorHeader {...props} level="3xl" />;
        case "h2":
          return <SanityAnchorHeader {...props} level="2xl" />;
        case "h3":
          return <SanityAnchorHeader {...props} level="xl" />;
        case "h4":
          return <SanityAnchorHeader {...props} level="lg" />;
        case "h5":
          return <SanityAnchorHeader {...props} level="base" />;
        case "h6":
          return <SanityAnchorHeader {...props} level="sm" />;
        case "normal":
          if (props.node.listItem) {
            return <li>{props.children}</li>;
          } else {
            return <p>{props.children}</p>;
          }
        default:
          return <p>{props.children}</p>;
      }
    },
    types: {
      image: SanityImage,
    },
    marks: {
      link: SanityLink,
    },
  };
  if (!content) {
    return null;
  }
  const groupedContent = groupListItems(content);
  return <PortableText value={groupedContent} components={components} />;
}

function groupListItems(content) {
  const output = [];
  let currentList = null;
  content.forEach((block) => {
    if (block.listItem) {
      if (!currentList) {
        currentList = { _type: "list", children: [block] };
      } else {
        currentList.children.push(block);
      }
    } else {
      if (currentList) {
        output.push(currentList);
        currentList = null;
      }
      output.push(block);
    }
  });
  if (currentList) {
    output.push(currentList);
  }
  return output;
}
