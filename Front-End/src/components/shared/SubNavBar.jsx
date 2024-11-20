import { NavLink } from "react-router-dom"
import { HeaderNavStyle } from "./style/styleTag"

export default function SubNavBar({urlList}) {
    return (
        <HeaderNavStyle >
            <span></span>
            <ol>
                {
                    urlList.map( link => {
                        return <li><NavLink to={link.path} style={({ isActive }) => { return {textDecoration: 'none' , fontSize: '16px' , fontWeight: isActive ? '600' : '300' , color: 'white'} }}>{link.title}</NavLink></li>
                    })
                }
            </ol>
            <span></span>
        </HeaderNavStyle >   
    )
}