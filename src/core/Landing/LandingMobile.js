import React from 'react'
import { Link as ScrollLink } from "react-scroll";

import ChooseMob from "../../components/design-landing/ChooseMob";
import Intro from '../../components/design-landing/Intro';
import LandingHeader from "../../components/design-landing/LandingHeader";
import Contact from '../Contact';
import DepSkeleton from "../../components/skelatons/DepSkeleton";

// import VisibilityIcon from "@mui/icons-material/Visibility";
// import Logo from "./../../assets/images/orijinalLogo.png";
// import Fans from "./../../assets/images/fans.png";


const LandingMobile = (props) => {
  return (
    <div >
      <LandingHeader ScrollLink={ScrollLink} />
      <Intro />
      {
        props.loading ? <DepSkeleton />  : <ChooseMob departments={props.departments} />
      }
      
      <Contact />
    </div>
  );
}

export default LandingMobile
