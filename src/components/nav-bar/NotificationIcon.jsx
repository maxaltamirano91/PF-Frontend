import React from 'react'
import { Bell } from 'lucide-react'
import styled from 'styled-components'

const NotificationIconWrapper = styled.div`
	position: relative;
	display: inline-block;
`

const RedDot = styled.span`
	position: absolute;
	top: -4px;
	right: -4px;
	width: 8px;
	height: 8px;
	background-color: red;
	border-radius: 50%;
	border: 2px solid white;
`

const NotificationIcon = ({ hasUnreadNotifications }) => {
	return (
		<NotificationIconWrapper>
			<Bell size={20} color='red' />
			{hasUnreadNotifications && <RedDot />}
		</NotificationIconWrapper>
	)
}

export default NotificationIcon
