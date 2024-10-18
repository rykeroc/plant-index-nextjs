"use client"

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import MaterialIcon from "@/app/_components/MaterialIcon";
import {useState} from "react";

type DropdownOptions = {
	[key: string] : string
}

type DropdownProps = {
	label: string,
	options: DropdownOptions,
	onSelect: (option: string) => void
}

const Dropdown = ({ label, options, onSelect }: Readonly<DropdownProps>) => {
	const [isOpen, setIsOpen] = useState(false)
	const handleClick = (option: string) => {
		console.log(`${label}: Changed to '${options[option]}'`)
		onSelect(option)
		setIsOpen(!isOpen)
	}

	return (
		<Menu as={"div"}>
			<div>
				<MenuButton className={"flex flex-row"}>
					<p>{label}</p>
					<MaterialIcon name={"keyboard_arrow_right"} className={"bg-transparent"}/>
				</MenuButton>
			</div>

			<MenuItems
				className={"absolute shadow-lg p-3 pe-10 rounded-lg z-10 bg-background flex flex-col gap-2"}>
				{
					Object.keys(options).map(optionKey =>
						<MenuItem key={optionKey}>
							<p onClick={() => handleClick(optionKey)}
							   className={optionKey.toString() == "Select" ? "text-textSecondary" : ""}>
								{optionKey.split("_").join(" ")}
							</p>
						</MenuItem>
					)
				}
			</MenuItems>
		</Menu>
	)
}

export default Dropdown