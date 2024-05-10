export const load = async ({ locals }) => {

    locals.posts = await locals.pb.collection('posts').getFullList({
        sort: '-created',
        expand: 'user',
    });


    if (locals.posts) {
        return {
            posts: locals.posts,
            user: locals.pb.authStore.model
        };
    }
    return {
        posts: undefined
    };
};