import type {Metadata} from "next";
import {Montserrat} from 'next/font/google'
import "./ui/css/globals.css";
import "./ui/css/globalicons.css";
import React from "react";

const montserrat = Montserrat({
	subsets: ['latin'],
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'Plant Index',
	description: 'Discover and learn about house plants',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en">
		<body className={`${montserrat.className} antialiased p-6`}>

		<h1 className={"text-primary mb-3"}>Plants</h1>
		<hr className={"mb-2"}/>

		{children}

		</body>
		</html>
	);
}
