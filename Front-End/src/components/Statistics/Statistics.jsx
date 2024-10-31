import Title from "../Global/Title";

export default function Statistics() {
  console.log('render')
  return (
    <div style={{width: "100%",padding: "20px",fontSize: "30px",}}>
      <Title title={window.location.pathname} />
    </div>
  );
}
