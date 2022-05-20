import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'
import styled, { css } from 'styled-components'
import { setLogout } from '../../redux/features/authSlice'
import decode from 'jwt-decode'

const MenuWrapper = styled.div`
	z-index: 1000;
	position: relative;
	background-image: linear-gradient(to bottom, #2cccff, #f62682);
	width: 300px;
	transition: transform 0.2s linear;
	${props =>
		!props.active &&
		css`
			transform: translateX(-100%);
		`}
	${props =>
		props.active &&
		css`
			transform: translateX(0);
		`}
`

const IconToogle = styled.button`
	position: absolute;
	right: 0;
	background-color: #a873ff;
	color: white;
	border: none;
	width: 35px;
	height: 35px;
	font-size: 20px;
	font-weight: bold;
`

const ListMenu = styled.ul`
	position: absolute;
	top: 30px;
	width: 100%;
	& > li:hover > a {
		color: #a873ff;
	}
`

const ItemMenu = styled.li`
	background-color: white;
	width: 100%;
	display: flex;
	align-items: center;
	padding: 20px 0 20px 20px;
	& > a {
		color: black;
		transition: color 0.1s linear;
		text-decoration: none;
	}
`

const Menu = ({ isActive, setIsActive, color }) => {
	const { user } = useSelector(state => ({ ...state.auth }))
	const dispatch = useDispatch()
	const token = user?.token
	const userOnline = JSON.parse(localStorage.getItem('profile'))
	if (token) {
		const decodedToken = decode(token)
		if (decodedToken.exp * 1000 < new Date().getTime()) {
			dispatch(setLogout())
		}
	}
	const handleToggle = () => {
		setIsActive(isActive => !isActive)
	}
	const handleLogout = () => {
		dispatch(setLogout())
	}
	return (
		<MenuWrapper active={isActive}>
			<div style={{ backgroundColor: 'white' }}>
				<IconToogle onClick={handleToggle}>
					<i className="fa-solid fa-xmark"></i>
				</IconToogle>
				<ListMenu>
					{userOnline ? (
						<ItemMenu>
							<h1>{userOnline.result.name}</h1>
						</ItemMenu>
					) : (
						<ItemMenu>
							<Link to={path.login}>LOGIN</Link>
						</ItemMenu>
					)}
					<ItemMenu>
						<Link to={path.home}>HOME</Link>
					</ItemMenu>
					<ItemMenu>
						<Link to={path.create}>CREATE</Link>
					</ItemMenu>
					<ItemMenu>
						<Link to="">ABOUT ME</Link>
					</ItemMenu>
					{userOnline && (
						<ItemMenu>
							<div style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>
								LOGOUT
							</div>
						</ItemMenu>
					)}
				</ListMenu>
			</div>
		</MenuWrapper>
	)
}

export default Menu
