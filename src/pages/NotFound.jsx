import { useNavigate } from "react-router-dom";
import ErrorPage from "../components/global/ErrorPage";
import image_404 from "../assets/image_404.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <ErrorPage
      btnAction={{
        onClick: () => {
          navigate("/");
        },
        text: "Back to Home",
      }}
      src={image_404}
      subTitle="Looks like page you search doesn't exist"
      title="Page Not Found"
    />
  );
};
export default NotFound;
