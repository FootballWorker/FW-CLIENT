import * as React from "react";
import { Link as ScrollLink } from "react-scroll";

import Contact from "../Contact";
import Choose from "../../components/design-landing/Choose";
import LandingHeader from "../../components/design-landing/LandingHeader";
import Intro from "../../components/design-landing/Intro";

export default function LandingPC(props) {
  return (
    <div>
      <LandingHeader ScrollLink={ScrollLink} />
      <Intro />
      <Choose departments={props.departments}  />
      <Contact />
    </div>
  );
}
