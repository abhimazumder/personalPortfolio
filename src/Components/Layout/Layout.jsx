import { lazy, useCallback, useEffect } from "react";
import { Container, Grid, GridItem } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import Header from "../Header/Header.jsx";
import Hero from "../Hero/Hero.jsx";

// const Header = lazy(() => import("../Header/Header"));
// const Hero = lazy(() => import("../Hero/Hero"));
const ProjectSection = lazy(() =>
  import("../Projects/ProjectSection")
);
const AboutMeSection = lazy(() =>
  import("../AboutMe/AboutMeSection")
);
const ContactSection = lazy(() =>
  import("../Contact/ContactSection")
);
const Footer = lazy(() => import("../Footer/Footer"));

const Layout = () => {
  const location = useLocation();

  const scrollToSection = useCallback((navlink) => {
    if (!navlink) return;

    if(navlink === "resume"){
      console.log(navlink);
      const resumeLink = 'https://drive.google.com/file/d/1AJVvo9oxgVryo0sAGm7KajQaW_GAgVmC/view?usp=sharing';
      window.open(resumeLink, '_blank', 'noopener noreferrer');
      return;
    }

    const element = document.getElementById(navlink) || null;
    if (!element) return;

    const elementTop = element?.getBoundingClientRect()?.top || 0;

    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    const targetScrollPosition =
      elementTop + window.scrollY - 0.15 * viewportHeight || 0;

    window.scrollTo({
      top: targetScrollPosition,
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, []);

  useEffect(() => {
    scrollToSection(location.pathname.replace(/^\//, ''));
  }, [scrollToSection, location.pathname]);

  return (
    <>
      <Header scrollToSection={scrollToSection} />
      <Container maxW="6xl">
        <Grid
          templateColumns={{ base: "1fr", md: "1fr" }}
          alignItems="start"
          rowGap={16}
        >
          <GridItem id="hero">
            <Hero />
          </GridItem>

          <GridItem id="projects">
            <ProjectSection />
          </GridItem>

          <GridItem id="aboutme">
            <AboutMeSection />
          </GridItem>

          <GridItem id="contact">
            <ContactSection />
          </GridItem>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
