import React from "react";

const Layout = ({children}: { children: React.ReactNode }) => {
	return (
		<div className={"w-full flex flex-row justify-center"}>
			{children}
		</div>
	)
}

export default Layout