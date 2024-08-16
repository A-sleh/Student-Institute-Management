import "./Global.css";

export default function Title({ title }) {
  let formatTitle = title.split("").map((char) => {
    return char == char.toUpperCase() && char != "/"
      ? ` ${char}`
      : char === "/"
      ? ""
      : char;
  });

  return <h2 className="title">{formatTitle}</h2>;
}
