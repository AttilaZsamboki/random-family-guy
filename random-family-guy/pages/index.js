import * as React from "react";
import { useQuery, QueryClientProvider, QueryClient } from "react-query";
import axios from "axios";

const queryClient = new QueryClient();

const fetchData = async () => {};

function RandomFamily() {
	const { data } = useQuery(["imdb"], () => fetchData());
	return (
		<QueryClientProvider client={queryClient}>
			<div>
				<h1>Roll a random episode</h1>
			</div>
		</QueryClientProvider>
	);
}

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RandomFamily />
		</QueryClientProvider>
	);
}
