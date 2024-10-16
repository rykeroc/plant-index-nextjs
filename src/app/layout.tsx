import type {Metadata} from "next";
import {Montserrat} from 'next/font/google'
import "./ui/css/globals.css";
import "./ui/css/globalicons.css";
import React from "react";
import Header from "@/app/ui/components/Header";

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

			<Header className={"mb-3"}/>

			{children}

		</body>
		</html>
	);
}
