import React from "react";
import { FcCellPhone } from "react-icons/fc";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer>
      <span>&copy; COPYRIGHT CAKELICIOUS BURGERSFORT 2018</span>{" "}
      <span>
        |{" "}
        <span>
          <FcCellPhone />
        </span>{" "}
        071 234 5678
      </span>{" "}
      <span>
        |{" "}
        <span>
          <MdEmail />
        </span>{" "}
        cakelicious@gmail.com
      </span>
    </footer>
  );
};

export default Footer;
