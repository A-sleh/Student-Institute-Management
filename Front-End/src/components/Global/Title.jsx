
import "./Global.css";

export default function Title({ title }) {

  let isTheSecondOne = false ; // if the path contain multi ( / ) i will ignore it so i do that in bool value

  let formatTitle = title.split("").map((char,index) => {
     if( isTheSecondOne || ( char == '/' && index == 0)) return '' ; // to replace the first "/" and ignore any char in the second one 
     else if( !isTheSecondOne && char == '/' && index > 0) { // index > 0 : if the backslash is the first one continu eles stop return any char  
      isTheSecondOne = true;
       return ''
     }
      else return char == char.toUpperCase()? ` ${char}` : char ;
  });

  return <h2 className="title">{formatTitle}</h2>;
}
