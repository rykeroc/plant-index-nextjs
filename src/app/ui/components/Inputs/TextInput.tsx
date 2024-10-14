"use client"

import MaterialIcon from "@/app/ui/components/MaterialIcon";
import React, {useState} from "react";
import {IconPlacementType} from "@/app/types/IconPlacementType";

type TextInputProps = {
	placeholder: string,
	iconName?: string,
	iconPlacement?: IconPlacementType
}

const TextInput = ({placeholder, iconName, iconPlacement = "leading"}: Readonly<TextInputProps>) => {
	const [isContainerHover, setIsContainerHovered] = useState(false)
	const handleOnContainerHover = () => setIsContainerHovered(true)
	const handleOnContainerLeave = () => setIsContainerHovered(false)

	const [isInputFocused, setIsInputFocused] = useState(false)
	const handleOnInputFocus = () => setIsInputFocused(true)
	const handleOnInputBlur = () => setIsInputFocused(false)

	const iconColorClassName = isInputFocused || isContainerHover ? "text-primary" : "text-textSecondary"
	const icon: React.ReactNode | null = iconName != undefined ? (
		<MaterialIcon name={iconName} className={iconColorClassName}/>
	) : null

	return (
		<div className={'w-full p-3 rounded-lg bg-container ' +
			'flex flex-row space-x-3 '}
			 onMouseEnter={handleOnContainerHover} onMouseLeave={handleOnContainerLeave}>
			{/* Leading icon */}
			{
				icon && iconPlacement == "leading" && icon
			}

			{/* Text input*/}
			<input className={
				'text-textSecondary bg-transparent caret-primary'
			} type={"text"} placeholder={placeholder} onFocus={handleOnInputFocus} onBlur={handleOnInputBlur}/>

			{/* Trailing icon*/}
			{
				icon && iconPlacement == "trailing" && icon
			}
		</div>
	)
}

export default TextInput