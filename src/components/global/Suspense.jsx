import { Suspense as SuspenseReact } from "react";
import Loading from "./Loading";

/**
 *
 * @param {import("react").SuspenseProps} props
 * @returns {Element}
 */
const Suspense = ({ children, ...props }) => {
  return (
    <SuspenseReact fallback={<Loading />} {...props}>
      {children}
    </SuspenseReact>
  );
};
export default Suspense;
