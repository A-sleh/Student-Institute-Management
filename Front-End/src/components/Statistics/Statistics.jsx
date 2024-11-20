import Title from "../Global/Title";
import SimpleChar from "./SimpleColumnChart";

export default function Statistics() {
  
  return (
      <>
        <Title title={window.location.pathname} />
        <SimpleChar />
      </>
  );
}
