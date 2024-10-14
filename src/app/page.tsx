"use client"

import TextInput from "@/app/ui/components/Inputs/TextInput";
import Button from "@/app/ui/components/Inputs/Button";

export default function Home() {
	const handleOnClick = () => {
		// TODO
		console.log("Filter button clicked")
	}

	return (
		<>
			<div className={"flex flex-row space-x-3"}>
				{/* Search bar */}
				<TextInput placeholder={"Search"} iconName={"search"} iconPlacement={"leading"}/>
				{/* Filter button */}
				<Button iconName={"tune"} onClick={handleOnClick}/>
			</div>
		</>
	);
}
