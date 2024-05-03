import { useMediaQuery } from "@chakra-ui/react";

const useResponsive = () => {
  const [sm] = useMediaQuery("(max-width: 575.98px)");
  const [md] = useMediaQuery("(min-width: 576px)");
  const [lg] = useMediaQuery("(min-width: 768px)");
  const [xl] = useMediaQuery("(min-width: 992px)");
  return {
    sm,
    md,
    lg,
    xl,
  };
};

export default useResponsive;
