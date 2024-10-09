
import { useState } from 'react'
import Title from '../Global/Title'
import { NavLink, Outlet } from 'react-router-dom'
import { HeaderNavStyle } from './CreateTestTools/EmentsStyle'

export default function Test() {

    return(
        <>
            <Title title={window.location.pathname}/> 
                <HeaderNavStyle >
                    <span></span>
                    <li><NavLink to={'NewTest'} style={({ isActive }) => {
                        return {textDecoration: 'none' , fontSize: '16px' , fontWeight: isActive ? '600' : '300' , color: 'white'}
                    }}>New Test</NavLink></li>
                    <li><NavLink to={'ShowAllTest'} style={({ isActive }) => {
                        return {textDecoration: 'none' , fontSize: '16px' , fontWeight: isActive ? '600' : '300' , color: 'white'}
                        }}>Show All Tests</NavLink></li>
                    <li><NavLink to={'ManageTest'} style={({ isActive }) => {
                        return {textDecoration: 'none' , fontSize: '16px' , fontWeight: isActive ? '600' : '300' , color: 'white'}
                        }}>Manage Tests</NavLink></li>
                    <li><NavLink to={'RecivingMarks'} style={({ isActive }) => {
                        return {textDecoration: 'none' , fontSize: '16px' , fontWeight: isActive ? '600' : '300' , color: 'white'}
                        }}>Reciving Marks</NavLink></li>
                    <span></span>
                </HeaderNavStyle>         
            <Outlet />
        </>
    )
}