import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	try {
		locals.user = await locals.pb.collection('users').getOne(locals.user.id);
	} catch (err) {
		console.log(err);
	}

	if (locals.user) {
		return {
			user: locals.user
		};
	} else {
		return {
			user: undefined
		};
	}
};

export const actions = {
	update_profile: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		if (body.avatar === '') {
			delete body.avatar;
		}

		//check if username is taken
		const users = await locals.pb.collection('users').getFullList({
			filter: 'username = "' + body.username + '"'
		});

		if (users.length > 0 && users[0].id !== locals.user.id) {
			throw error(418, 'I am a teapot');
		}

		try {
			await locals.pb.collection('users').update(locals.user.id, body);
		} catch (err) {
			console.log(err);
		}
	},
	update_password: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		if (body.password == body.password_confirm) {
			try {
				await locals.pb.collection('users').update(locals.user.id, {
					password: body.password
				});
			} catch (err) {
				console.log(err);
			}
		}
	}
};
