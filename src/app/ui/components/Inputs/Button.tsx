"use client"

import {IconPlacementType} from "@/app/types/IconPlacementType";
import React, {useState} from "react";
import MaterialIcon from "@/app/ui/components/MaterialIcon";

type ButtonProps = {
	text?: string,
	iconName?: string,
	iconPlacement?: IconPlacementType,
	onClick: () => void,
	className?: string
}

const Button = ({text = "", iconName, iconPlacement = "leading", onClick, className}: Readonly<ButtonProps>) => {
	const [isHovered, setIsHovered] = useState(false)
	const handleOnHover = () => setIsHovered(true)
	const handleOnLeave = () => setIsHovered(false)

	const colorClass = isHovered ? "text-primary" : "text-textSecondary"

	const icon: React.ReactNode | null = iconName != undefined ? (
		<MaterialIcon name={iconName}/>
	) : null

	return (
		<button className={"p-3 rounded-lg bg-container " +
			`flex flex-row space-x-3 ` +
			`${colorClass} ${className} `}
				onClick={onClick}
				onMouseEnter={handleOnHover}
				onMouseLeave={handleOnLeave}>
			{/* Leading icon */}
			{
				icon && iconPlacement == "leading" && icon
			}

			{
				text != undefined ? text : ""
			}

			{/* Trailing icon */}
			{
				icon && iconPlacement == "trailing" && icon
			}
		</button>
	)
}

export default Button