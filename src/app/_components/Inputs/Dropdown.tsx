"use client"

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import MaterialIcon from "@/app/_components/MaterialIcon";
import {useState} from "react";

type DropdownOptions = {
	[key: string] : string
}

type DropdownProps = {
	label: string,
	selected: string,
	options: DropdownOptions,
	onSelect: (option: string) => void,
}

const Dropdown = ({ label, selected, options, onSelect }: Readonly<DropdownProps>) => {
	const [isOpen, setIsOpen] = useState(false)
	const handleClick = (option: string) => {
		console.log(`${label}: Changed to '${options[option]}'`)
		onSelect(option)
		setIsOpen(!isOpen)
	}

	return (
		<Menu as={"div"}>
			<div>
				<MenuButton className={"flex flex-row items-center w-full space-x-1"}>
					<MaterialIcon name={"keyboard_arrow_right"} className={`bg-transparent`}/>
					<h4>{label}</h4>
				</MenuButton>
			</div>

			<MenuItems
				className={`p-2 rounded-xl bg-container mt-1 flex flex-col gap-2`}>
				{
					Object.keys(options).map(optionKey =>
						<MenuItem key={optionKey} as={'p'}
						  	onClick={() => handleClick(optionKey)} className={
								`${optionKey == selected ? 'text-primary' : ''} ` +
								`${optionKey == "Select" ? 'text-textSecondary' : ''} `
						}>
								{optionKey.split("_").join(" ")}
						</MenuItem>
					)
				}
			</MenuItems>
		</Menu>
	)
}

export default Dropdown