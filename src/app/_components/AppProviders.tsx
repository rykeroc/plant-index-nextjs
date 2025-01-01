'use client'

import React, {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const AppProviders = ({children}: Readonly<{ children: React.ReactNode }>) => {
	const [queryClient] = useState(() => new QueryClient())
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}

export default AppProviders