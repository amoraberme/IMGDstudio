import { Outlet } from "react-router-dom";
import ContactModal from "../components/common/ContactModal";
import CustomCursor from "../components/common/CustomCursor";
import MotionObserver from "../components/common/MotionObserver";
import { SiteShellProvider } from "../components/common/SiteShellContext";

export default function SiteLayout() {
  return (
    <SiteShellProvider>
      <MotionObserver />
      <Outlet />
      <ContactModal />
      <CustomCursor />
    </SiteShellProvider>
  );
}
