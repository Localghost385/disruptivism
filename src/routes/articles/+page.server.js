export const load = async ({ locals }) => {

    locals.articles = await locals.pb.collection('articles').getFullList(99, {
        sort: '-created',
        expand: 'author',
    });

    if (locals.articles) {
        return {
            articles: locals.articles,
        };
    }
    return {
        articles: undefined
    };
};