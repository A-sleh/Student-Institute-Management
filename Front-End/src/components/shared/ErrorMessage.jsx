import { ErrorMessageStyle } from "./styleTag";

export default function ErrorMessage({message,showMessage}) {
    return showMessage && <ErrorMessageStyle>{message}</ErrorMessageStyle>
}