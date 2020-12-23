import '../styles/index.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import { ReactQueryDevtools } from 'react-query/devtools';

export default function MyApp({ Component, pageProps }): JSX.Element {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
			<ReactQueryDevtools initialIsOpen />
		</QueryClientProvider>
	);
}
