import {
  IconDiscord,
  // IconEmail,
  IconGitHub,
  IconTwitter,
} from "components/icons";
import React from "react";
import "./Footer.scss";

function SocialLink({
  icon,
  href,
}: {
  icon: JSX.Element;
  href: string;
}): JSX.Element {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {icon}
    </a>
  );
}

export function Footer(): JSX.Element {
  return (
    <div className="footer">
      <div className="authors">
        By{" "}
        <a
          href="https://twitter.com/tiagosada"
          target="_blank"
          rel="noreferrer noopener"
        >
          Tiago
        </a>
        ,{" "}
        <a
          href="https://github.com/paolodamico"
          target="_blank"
          rel="noreferrer noopener"
        >
          Paolo
        </a>
        , and{" "}
        <a
          href="https://twitter.com/_anishagnihotri"
          target="_blank"
          rel="noreferrer noopener"
        >
          Anish
        </a>
      </div>
      <div className="social">
        <SocialLink
          icon={<IconTwitter />}
          href="https://twitter.com/@magicjarHQ"
        />
        <SocialLink
          icon={<IconGitHub />}
          href="https://github.com/magicjarHQ"
        />
        {/* <SocialLink icon={<IconEmail />} href="mailto:tbd@tbd.com" /> */}
        <SocialLink icon={<IconDiscord />} href="https://discord.gg/edXzegJ9" />
      </div>
    </div>
  );
}
