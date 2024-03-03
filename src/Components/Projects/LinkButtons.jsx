import { Button, Flex, Icon, Spacer, useColorMode } from "@chakra-ui/react";
import { memo } from "react";
import { FiGithub } from "react-icons/fi";
import { SiVercel } from "react-icons/si";

import PropTypes from "prop-types";

const LinkButtons = memo(({ demoLink, repoLink }) => {
  const { colorMode } = useColorMode();

  return (
    <Flex justify={"space-between"}>
      {demoLink?.length > 0 && (
        <Button
          leftIcon={<Icon w={5} h={5} as={SiVercel} color={"inherit"} />}
          variant="solid"
          color={"white"}
          bgColor={"black"}
          _hover={{
            color: colorMode === "dark" ? "inherit" : "black",
            bgColor: "primary.50",
            transition: "background-color 0.3s ease",
          }}
          onClick={() => window.open(demoLink, "_blank")}
        >
          live demo
        </Button>
      )}
      <Spacer/>
      {repoLink?.length > 0 && (
        <Button
          leftIcon={<Icon w={5} h={5} as={FiGithub} color={"inherit"} />}
          variant="solid"
          color={"white"}
          bgColor={"primary.600"}
          _hover={{
            color: colorMode === "dark" ? "inherit" : "primary.600",
            bgColor: "primary.50",
            transition: "background-color 0.3s ease",
          }}
          onClick={() => window.open(repoLink, "_blank")}
        >
          code
        </Button>
      )}
    </Flex>
  );
});

LinkButtons.displayName = "LinkButtons";

LinkButtons.propTypes = {
  demoLink: PropTypes.string.isRequired,
  repoLink: PropTypes.string.isRequired,
};

export default LinkButtons;
