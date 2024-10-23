import type {Metadata} from "next";
import {Montserrat} from 'next/font/google'
import "@/app/_css/globals.css";
import "@/app/_css/globalicons.css";
import React from "react";
import Header from "@/app/_components/Header";
import AppProviders from "@/app/_components/AppProviders";

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

			<AppProviders>
				{children}
			</AppProviders>
		</body>
		</html>
	);
}
