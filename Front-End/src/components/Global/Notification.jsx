import "./Global.css";

export default function Notification({ title, type ,state }) {
  return <div className={"notification " + type}
  style={{
    transform: state ? "scaleX(1)" : `scaleX(0) `,
    transformOrigin : state ? "left" : 'right'
  }}>{title}</div>;
}
