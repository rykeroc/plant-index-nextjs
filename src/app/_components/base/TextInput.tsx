"use client"

import MaterialIcon from "@/app/_components/MaterialIcon";
import React, {useState} from "react";
import {IconPlacementType} from "@/app/_types/IconPlacementType";

type TextInputProps = {
	placeholder: string,
	iconName?: string,
	iconPlacement?: IconPlacementType
	setValue: (val: string) => void
}

const TextInput = ({placeholder, iconName, iconPlacement = "leading", setValue}: Readonly<TextInputProps>) => {
	const [internalValue, setInternalValue] = useState('')
	const handleInternalValueChange = (e: React.ChangeEvent<HTMLInputElement>) => setInternalValue(e.target.value)

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

	const handleEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter'){
			console.log(`TextInput: Setting value to '${internalValue}'`)
			setValue(internalValue)
		}
	}

	return (
		<div className={'w-full p-3 rounded-lg bg-container ' +
			'flex flex-row space-x-3 '}
			 onMouseEnter={handleOnContainerHover} onMouseLeave={handleOnContainerLeave}>
			{/* Leading icon */}
			{
				icon && iconPlacement == "leading" && icon
			}

			{/* Text input*/}
			<input
				className={
					'text-textSecondary bg-transparent caret-primary'
				}
				type={"text"}
				placeholder={placeholder}
				value={internalValue}
				onChange={handleInternalValueChange}
				onKeyUp={handleEnterPressed}
				onFocus={handleOnInputFocus}
				onBlur={handleOnInputBlur} />

			{/* Trailing icon*/}
			{
				icon && iconPlacement == "trailing" && icon
			}
		</div>
	)
}

export default TextInput