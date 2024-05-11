export const load = async ({ locals, params }) => {

    locals.post = await locals.pb.collection('posts').getOne(params.post_id, {
        expand: 'user,replies.user',
    });

    try {

        locals.user = await locals.pb.collection('users').getOne(locals.user.id)
    } catch (err) {

        console.log(err)
    }

    if (locals.post) {
        return {
            post: locals.post,
            user: locals.user
        };
    }
    return {
        post: undefined
    };
};

export const actions = {
    submit: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());

        let user = locals.user.id;

        try {
            const new_reply = await locals.pb.collection('replies').create(
                {
                    user, ...body
                }
            )

            const post = await locals.pb.collection('posts').getOne(body.post_id, {

            })

            await locals.pb.collection('users').update(locals.user.id, {
                ...locals.user, replies: [...locals.user.replies, new_reply.id]
            });

            await locals.pb.collection('posts').update(body.post_id, {
                ...post, replies: [...post.replies, new_reply.id]
            })
        } catch (err) {
            console.log(err);
        }
    },

    vote_inc: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());

        try {
            //increase votes by one
            const reply = await locals.pb.collection('replies').getOne(body.reply_id);
            await locals.pb.collection('replies').update(body.reply_id, {
                votes: reply.votes + 1
            })
            const user = await locals.pb.collection('users').getOne(locals.user.id);
            await locals.pb.collection('users').update(locals.user.id, {
                reply_votes: [...user.reply_votes, body.reply_id]
            })

            console.log(locals.user.username + " voted on " + body.reply_id)
        } catch (err) {
            console.log(err);
        }
    },
    vote_dec: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());

        try {
            //decrease votes by one
            const reply = await locals.pb.collection('replies').getOne(body.reply_id);
            await locals.pb.collection('replies').update(body.reply_id, {
                votes: reply.votes - 1
            })
            const user = await locals.pb.collection('users').getOne(locals.user.id);
            await locals.pb.collection('users').update(locals.user.id, {
                reply_votes: user.reply_votes.filter((id) => id != body.reply_id)
            })

            console.log(locals.user.username + " voted on " + body.reply_id)
        } catch (err) {
            console.log(err);
        }
    }
}