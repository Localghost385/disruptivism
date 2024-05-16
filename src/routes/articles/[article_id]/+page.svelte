<script>
	import CenterBlock from '$lib/components/reusable/CenterBlock.svelte';
	import { Card, GradientButton } from 'flowbite-svelte';
	import { ArrowLeftOutline } from 'flowbite-svelte-icons';

	export let data;
</script>

<div class="w-full p-10 flex flex-col items-center justify-center gap-5">
	<div class="w-full max-w-2xl">
		<GradientButton outline pill color="redToYellow" class="w-1/4" href="/articles"> <ArrowLeftOutline /> Back to Articles</GradientButton>
	</div>
	{#if data.article != undefined}
		<Card
			img="https://disruptivism.pockethost.io/api/files/articles/{data.article.id}/{data.article
				.preview}"
			class="w-full max-w-2xl"
		>
			<h5
				class="mb-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white pb-2 border-b-2 border-gray-300 dark:border-gray-700"
			>
				{data.article.title}
			</h5>
			<p class="mb-3 font-normal text-2xl text-gray-700 dark:text-gray-400 leading-tight">
				{@html data.article.content}
			</p>
		</Card>
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
