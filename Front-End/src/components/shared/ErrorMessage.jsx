import { ErrorMessageStyle } from "./style/styleTag";

export default function ErrorMessage({message,showMessage}) {
    return showMessage && <ErrorMessageStyle>{message}</ErrorMessageStyle>
}