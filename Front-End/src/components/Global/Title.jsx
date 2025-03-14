
import { useSelector } from "react-redux";
import "./Global.css";
import { TitleStyle } from "./globalComponentStyle";
import { TitlesTEXT } from "../../Data/static/Titles";
import { ARABIC } from "../../Redux/actions/type";

export default function Title({ title }) {


  const {currentLange} = useSelector( state => state.language)
  let isTheSecondOne = false ; // if the path contain multi ( / ) i will ignore it so i do that in bool value

  // this case if the user enter ( / ) as path to ignore un valid page
  if( title[0] == '/' &&  title.length == 1 ) {
    title = '/Statistics'
  }

  let formatTitle = title.split("").map((char,index) => {
     if( isTheSecondOne || ( char == '/' && index == 0)) return '' ; // to replace the first "/" and ignore any char in the second one 
     else if( !isTheSecondOne && char == '/' && index > 0) { // index > 0 : if the backslash is the first one continu eles stop return any char  
      isTheSecondOne = true;
       return ''
     }
      else return char == char.toUpperCase()? ` ${char}` : char ;
  }).join('');

  return <TitleStyle $language={currentLange}>{currentLange == ARABIC ? TitlesTEXT[formatTitle.split(' ').join('')]: formatTitle}</TitleStyle>;
}
