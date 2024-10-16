import React from "react";

type HeaderProps = {
	className?: string
}

const Header = ({ className }: Readonly<HeaderProps>) => {
  return (
	  <div className={`space-y-3 ${className}`}>
		  <h1 className={"text-primary"}>Plants</h1>
		  <hr/>
	  </div>
  )
}

export default Header