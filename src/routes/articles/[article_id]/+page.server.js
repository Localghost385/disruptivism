export const load = async ({ locals, params }) => {
	locals.article = await locals.pb.collection('articles').getOne(params.article_id, {
		expand: 'author'
	});

	locals.user = locals.pb.authStore.model;

	if (locals.article) {
		return {
			article: locals.article,
			user: locals.user
		};
	}
	return {
		article: undefined
	};
};
