export const load = async ({ locals, url }) => {
	const page = url.searchParams.get('page') || 1;

	locals.articles = await locals.pb.collection('articles').getList(page, 5, {
		sort: '-created',
		expand: 'author'
	});

	if (locals.articles) {
		return {
			articles: locals.articles
		};
	}
	return {
		articles: undefined
	};
};
