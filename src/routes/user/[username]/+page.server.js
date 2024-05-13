export const load = async ({ locals, params }) => {
	locals.user_profile = await locals.pb.collection('users').getFullList({
		filter: 'username = "' + params.username + '"',
		sort: '-created',
		expand: 'articles.author,posts.user,replies.user'
	});
	locals.user_profile = locals.user_profile[0];

	console.log(locals.user_profile);

	try {
		locals.user = await locals.pb.collection('users').getOne(locals.user.id);
	} catch (err) {
		console.log(err);
	}

	console.log(locals.user_profile);

	if (!locals.user_profile.expand) {
		locals.user_profile.expand = {};
	}

	if (!locals.user_profile.expand.articles) {
		locals.user_profile.expand.articles = undefined;
	} else {
		locals.user_profile.expand.articles = locals.user_profile.expand.articles.sort(
			(a, b) => new Date(b.created) - new Date(a.created)
		)
	}

	if (!locals.user_profile.expand.posts) {
		locals.user_profile.expand.posts = undefined;
	} else {
		locals.user_profile.expand.posts = locals.user_profile.expand.posts.sort(
			(a, b) => new Date(b.created) - new Date(a.created)
		)
	}

	if (!locals.user_profile.expand.replies) {
		locals.user_profile.expand.replies = undefined;
	} else {
		locals.user_profile.expand.replies = locals.user_profile.expand.replies.sort(
			(a, b) => new Date(b.created) - new Date(a.created)
		)
		// expand replies.post
		locals.user_profile.expand.replies.forEach((reply) => {
			reply.post = locals.user_profile.expand.posts.find((post) => post.id === reply.post)
		})

	}

	if (locals.user_profile) {
		return {
			user_profile: locals.user_profile,
			user: locals.user
		};
	}
	return {
		user_profile: undefined
	};
};
