export const load = async ({ locals, params }) => {

    locals.user_profile = await locals.pb.collection('users').getFullList({
        filter: 'username = "' + params.username + '"',
    });

    locals.user = locals.pb.authStore.model;

    console.log(locals.user_profile)

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