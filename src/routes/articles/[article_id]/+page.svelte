<script>
	import CenterBlock from '$lib/components/reusable/CenterBlock.svelte';

	export let data;
</script>

<CenterBlock width={'40vw'}>
	{#if data.article != undefined}
		<img
			class="absolute top-0 left-0 w-[40vw] h-[14vw] object-cover articles-thumbnail transition-all duration-300 border-b-[1px] border-ctp-text"
			src="https://disruptivism.pockethost.io/api/files/articles/{data.article.id}/{data.article
				.preview}"
			alt={data.article.title}
		/>
		<div class="mt-[14vw]">
			<div class=" text-4xl text-ctp-text flex flex-row items-center justify-center">
				{data.article.title}
			</div>

			<div class=" text-ctp-overlay2 text-xl w-max">By {data.article.expand.author.username}</div>

			<div class=" text-ctp-subtext1 text-2xl">
				{@html data.article.content}
			</div>
		</div>
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
</style>
