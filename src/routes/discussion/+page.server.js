
export const load = async ({ locals }) => {

    locals.posts = await locals.pb.collection('posts').getFullList({
        sort: '-created',
        expand: 'user',

    });

    try {
        locals.user = await locals.pb.collection('users').getOne(locals.user.id);
    }
    catch (err) {
        console.log(err);
        locals.user = undefined
    }
    if (locals.posts) {
        return {
            posts: locals.posts,
            user: locals.user,
        };
    }
    return {
        posts: undefined,
        user: undefined
    };
};

export const actions = {
    submit: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());

        let user = locals.user.id;

        try {
            const new_post = await locals.pb.collection('posts').create(
                {
                    user, ...body
                }
            )

            await locals.pb.collection('users').update(locals.user.id, {
                ...locals.user, posts: [...locals.user.posts, new_post.id]
            })
        } catch (err) {
            console.log(err);
        }
    },
    vote_inc: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());

        try {
            //increase votes by one
            const post = await locals.pb.collection('posts').getOne(body.post_id);
            await locals.pb.collection('posts').update(body.post_id, {
                votes: post.votes + 1
            })
            const user = await locals.pb.collection('users').getOne(locals.user.id);
            await locals.pb.collection('users').update(locals.user.id, {
                post_votes: [...user.post_votes, body.post_id]
            })

            console.log(locals.user.username + " voted on " + body.post_id)
        } catch (err) {
            console.log(err);
        }
    },
    vote_dec: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());

        try {
            //decrease votes by one
            const post = await locals.pb.collection('posts').getOne(body.post_id);
            await locals.pb.collection('posts').update(body.post_id, {
                votes: post.votes - 1
            })
            const user = await locals.pb.collection('users').getOne(locals.user.id);
            await locals.pb.collection('users').update(locals.user.id, {
                post_votes: user.post_votes.filter((id) => id != body.post_id)
            })

            console.log(locals.user.username + " voted on " + body.post_id)
        } catch (err) {
            console.log(err);
        }
    }
}