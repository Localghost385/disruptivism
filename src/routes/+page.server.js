export const load = async ({ locals }) => {

    locals.articles = await locals.pb.collection('articles').getList(1, 3, {
        sort: '-created',
    });

    console.log(locals.articles)

    if (locals.articles) {
        return {
            articles: locals.articles
        };
    }
    return {
        articles: undefined
    };
};
