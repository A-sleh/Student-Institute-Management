import { useNavigate } from "react-router-dom";
import Title from "../Global/Title";

export default function StudentInformation() {
  const navLink = useNavigate();

  return (
    <>
        <Title title={window.location.pathname } />
    </>
  );
}
