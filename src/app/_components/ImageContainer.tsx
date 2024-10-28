import React from "react";

const ImageContainer = ({children, className}: Readonly<{ children: React.ReactNode, className?: string }>) => {
  	return (
		  <div className={`flex items-center justify-center cursor-pointer rounded-xl bg-container ${className}`}>
			  {children}
		  </div>
	)
}

export default ImageContainer