
import { ShowCardContainerStyle } from "./styleTag";

export default function ShowInputCard({iconPath,children}) {

  return (
    <ShowCardContainerStyle>
      <i className={iconPath}></i>
      {children}
    </ShowCardContainerStyle>
  );
}
