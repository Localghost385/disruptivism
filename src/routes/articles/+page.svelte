<script>
	import { each } from 'svelte/internal';
	import CenterBlock from '$lib/components/reusable/CenterBlock.svelte';

	export let data;
</script>

<CenterBlock width={'40vw'}>
	{#if data.articles != undefined}
		<div class="flex flex-col items-center justify-center m-2">
			<div class="text-4xl text-ctp-text">Most Recent Articles</div>
			<div class="h-[1px] w-full bg-ctp-subtext0" />
		</div>

		{#if data.user != undefined && data.user.article_permissions == true}
			<a
				href="/articles/write"
				class="text-3xl text-ctp-lavender hover:text-ctp-blue underline transition-colors duration-300"
				>Write a new article?</a
			>
		{/if}
		{#each data.articles as article}
			<a
				href="/articles/{article.id}"
				class="relative h-[5vw] w-full border-[1px] border-ctp-text my-2 mx-10 shadow-lg shadow-ctp-crust hover:drop-shadow-2xl transition-all duration-300 hover:bg-ctp-surface0 article-item"
			>
				<img
					src="https://disruptivism.pockethost.io/api/files/articles/{article.id}/{article.preview}"
					alt={article.title}
					class=" z-0 absolute top-0 left-0 h-[5vw] w-[8vw] object-cover brightness-50 articles-thumbnail transition-all duration-300 article-thumbnail"
				/>
				<div class="relative text-xl text-ctp-text ml-[9vw] mr-[1vw] top-1/2 -translate-y-1/2">
					<div>{article.title}</div>
					<div class="flex flex-row items-center justify-between">
						<div class="text-ctp-overlay2">By {article.expand.author.username}</div>
						<div class="text-ctp-overlay2">{article.created}</div>
					</div>
				</div>
			</a>
		{/each}
	{:else}
		this article could not be found
	{/if}
</CenterBlock>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
	* {
		font-family: 'Urbanist', sans-serif;
		font-optical-sizing: auto;
		font-weight: 300;
		font-style: normal;
	}

	.article-item:hover .articles-thumbnail {
		filter: brightness(85%);
	}
</style>
