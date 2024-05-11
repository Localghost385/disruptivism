
export const load = async ({ locals }) => {

    locals.posts = await locals.pb.collection('posts').getFullList({
        sort: '-created',
        expand: 'user',
    });

    if (locals.posts) {
        return {
            posts: locals.posts,
            user: locals.user
        };
    }
    return {
        posts: undefined
    };
};

export const actions = {
    vote: async ({ locals, request }) => {

        const body = Object.fromEntries(await request.formData());
        try {
            const post = await locals.pb.collection('posts').getOne(body.post_id);

            let votes = post.votes
            votes += parseInt(body.change_amount)

            console.log(votes)

            await locals.pb.collection('posts').update(body.post_id, {
                ...post, votes,
            })
        } catch (err) {
            console.log(err);
        }
    },
    remove_vote_relation: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());
        // console.log(body)
        try {
            const user = locals.user;
            if (body.up_or_down == 'up') {
                user.post_upvotes = user.post_upvotes.filter((post_id) => post_id != body.post_id)
            } else if (body.up_or_down == 'down') {
                user.post_downvotes = user.post_downvotes.filter((post_id) => post_id != body.post_id)
            }
            await locals.pb.collection('users').update(user.id, {
                ...user
            })
        } catch (err) {
            console.log(err);
        }
    },
    add_vote_relation: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());
        console.log(body)
        try {
            const user = locals.user;
            if (body.up_or_down == 'up') {
                user.post_upvotes = [...user.post_upvotes, body.post_id]
            } else if (body.up_or_down == 'down') {
                user.post_downvotes = [...user.post_downvotes, body.post_id]
            }
            await locals.pb.collection('users').update(user.id, {
                ...user
            })
        } catch (err) {
            console.log(err);
        }
    }
}