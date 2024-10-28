"use client"

import React, {useState} from "react";

type ButtonProps = {
	children?: React.ReactNode,
	onClick?: () => void,
	className?: string
}

const Button = ({children, onClick, className}: Readonly<ButtonProps>) => {
	const [isHovered, setIsHovered] = useState(false)
	const handleOnHover = () => setIsHovered(true)
	const handleOnLeave = () => setIsHovered(false)

	const colorClass = isHovered ? "text-primary" : "text-textSecondary"

	return (
		<button className={"p-3 rounded-lg bg-container " +
			`flex flex-row gap-2 ` +
			`${colorClass} ${className} `}
				onClick={onClick}
				onMouseEnter={handleOnHover}
				onMouseLeave={handleOnLeave}>
			{/* Leading icon */}
			{
				children
			}
		</button>
	)
}

export default Button