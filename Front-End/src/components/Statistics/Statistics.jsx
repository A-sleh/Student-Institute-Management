import Title from "../Global/Title";
import GradeCounter from "./Grade/GradeCounter";


export default function Statistics() {
  
  return (
      <>
        <Title title={window.location.pathname} />
          <div style={{width: '400px'}}>
            <GradeCounter />
        </div>
      </>
  );
}
