<script>
	import { each } from 'svelte/internal';

	export let data;
</script>

<div
	class="top-0 z-[-1] w-screen h-min-content p-20 min-h-[calc(100vh-80px)] bg-ctp-base flex flex-col items-center justify-center bg-[url('/src/lib/images/blob-scene-haikei.svg')] bg-no-repeat bg-cover"
>
	{#if data.articles != undefined}
		<div
			class="relative w-[40vw] border-[1px] border-ctp-text bg-ctp-base bg-opacity-60 backdrop-blur-xl flex flex-col items-center justify-between p-5 shadow-lg shadow-ctp-crust"
		>
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
					class="relative h-[5vw] w-full border-[1px] border-ctp-text my-3 mx-4"
				>
					<img
						src="https://disruptivism.pockethost.io/api/files/articles/{article.id}/{article.preview}"
						alt={article.title}
						class=" z-0 absolute top-0 left-0 h-[5vw] w-[8vw] object-cover"
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
		</div>
	{:else}
		this article could not be found
	{/if}
</div>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
	* {
		font-family: 'Urbanist', sans-serif;
		font-optical-sizing: auto;
		font-weight: 300;
		font-style: normal;
	}
</style>
