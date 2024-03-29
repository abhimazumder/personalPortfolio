import {
  Flex,
  Heading,
  Icon,
  Link,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { memo, useMemo, useState } from "react";
import { FiLink } from "react-icons/fi";
import PropTypes from "prop-types";

const SectionHeading = memo(({ sectionName, sectionLink }) => {
  const [headerOnHover, setHeaderOnHover] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const { colorMode } = useColorMode();

  const handleOnMouseEnter = () => {
    setTooltipText("click to copy link");
    setHeaderOnHover(true);
  };

  const handleOnMouseLeave = () => {
    setHeaderOnHover(false);
    setTooltipText("");
  };

  const sectionURL = useMemo(() => {
    const host = window.location.hostname;
    const port = window.location.port ? `:${window.location.port}` : "";

    const protocol = host === "localhost" ? "" : "https://";

    return `${protocol}${host}${port}/${sectionLink}`;
  }, [sectionLink]);

  const handleOnClick = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(sectionURL);
    setTooltipText("link copied!");
  };

  return (
    <Flex
      alignItems={"baseline"}
      gap={4}
      py={1.5}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <Heading w={"auto"} fontFamily="primary" as="h2" size="2xl">
        {sectionName?.toLowerCase()}
      </Heading>
      <Tooltip hasArrow label={tooltipText} closeOnClick={false}>
        <Link href={sectionURL} _hover={{ textDecoration: "none" }} onClick={handleOnClick} aria-label={sectionLink}>
          <Icon
            boxSize={7}
            cursor={"pointer"}
            as={FiLink}
            color={colorMode == "dark" ? "inherit" : "grey"}
            opacity={headerOnHover ? "1" : "0"}
            _hover={{
              color: "primary.600",
              transition: "color .3s ease",
            }}
            transition={"opacity .3s ease"}
          />
        </Link>
      </Tooltip>
    </Flex>
  );
});

SectionHeading.displayName = "SectionHeading";

SectionHeading.propTypes = {
  sectionName: PropTypes.string,
  sectionLink: PropTypes.string,
};

export default SectionHeading;
