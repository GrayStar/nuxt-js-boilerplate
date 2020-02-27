export default function({ app, redirect }) {
	const accessToken = app.$cookies.get('accessToken');

	if (accessToken === undefined) {
		return redirect('/');
	}
}
