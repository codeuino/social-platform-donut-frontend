import { useMediaQuery } from "react-responsive";

const DesktopMinWidth = 1025;
const TabletMaxWidth = 1024;
const TabletMinWidth = 640;
const MobileMaxWidth = 640;
const DefaultMaxWidth = 768;

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: DesktopMinWidth });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: TabletMinWidth, maxWidth: TabletMaxWidth });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: TabletMaxWidth });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: DefaultMaxWidth });
  return isNotMobile ? children : null;
};

export { Desktop, Mobile, Tablet, Default };
