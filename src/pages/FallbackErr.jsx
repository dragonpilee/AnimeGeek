import imageError from "../assets/image_error.png";
import ErrorPage from "../components/global/ErrorPage";

const FallbackErr = ({ error, isNavbar = false }) => {
  return (
    <ErrorPage
      btnAction={{
        onClick: () => {
          window?.location?.reload();
        },
        text: "Refresh",
      }}
      src={imageError}
      subTitle={error}
      title={`Error ${isNavbar ? "in navbar" : ""}`}
    />
  );
};
export default FallbackErr;
