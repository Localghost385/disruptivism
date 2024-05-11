import { redirect, error } from '@sveltejs/kit';

export const actions = {
    write: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());

        let author = locals.user.id;



        try {
            const new_article = await locals.pb.collection('articles').create(
                {
                    author, ...body
                }
            )

            const articles = locals.user.articles + new_article.id

            locals.pb.collection('users').update(locals.user.id, {
                ...locals.user, articles
            })
        } catch (err) {
            console.log(err);
            throw error(418, 'I am a teapot')
        }

        throw redirect(303, '/articles');
    }
}