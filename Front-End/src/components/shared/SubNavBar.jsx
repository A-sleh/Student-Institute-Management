import { NavLink } from "react-router-dom"
import { HeaderNavStyle } from "./style/styleTag"
import { useSelector } from "react-redux"
import React from "react"

function SubNavBar({urlList}) {

    const {currentLange} = useSelector( state => state.language)
    console.log('child')

    return (
        <HeaderNavStyle >
            <span></span>
            <ol>
                {
                    urlList.map( (link,index) => {

                        if(!link.isAdmin) return // hidden manage link if the manager dosen't he login
                        return <li key={index}><NavLink to={link.path} style={({ isActive }) => { return {textDecoration: 'none' , fontSize: '16px' , fontWeight: isActive ? '600' : '300' , color: 'white'} }}>{link.title[currentLange]}</NavLink></li>
                    })
                }
            </ol>
            <span></span>
        </HeaderNavStyle >   
    )
}

export default React.memo(SubNavBar)