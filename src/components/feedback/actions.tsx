'use server';
export async function submitFeedback(formData: FormData) {
	const data = {
		email: formData.get('email'),
		phone: formData.get('phone'),
		name: formData.get('name'),
		message: formData.get('message'),
	};
	const response = await fetch('http://localhost:1337/api/form', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	if (!response.ok) throw new Error('Ошибка');

	const awaited = await response.json();
	console.log(awaited);
}
