export async function fetchJson<T>({
	url,
	options = { next: { revalidate: 60 } },
}: {
	url: string;
	options?: RequestInit;
}): Promise<T> {
	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error(`API request failed: ${url}`, error);
		throw error;
	}
}
