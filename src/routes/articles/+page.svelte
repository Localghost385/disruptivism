<script>
	import { Section, HeroHeader, HeroBody } from 'flowbite-svelte-blocks';
	import { Pagination } from 'flowbite-svelte';
	import { Button } from 'flowbite-svelte';
	import { ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
	import { ArrowRightOutline, } from 'flowbite-svelte-icons';
	import { Card } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data;

	$: activeUrl = $page.url.searchParams.get('page');
	let pages = [];

	if (data.articles != undefined) {
		for (let i = 1; i < data.articles.totalPages + 1; i++) {
			pages.push({ name: i, href: '/articles?page=' + i });
			if (i > 4) {
				break;
			}
		}
	}

	$: {
		pages.forEach((page) => {
			let splitUrl = page.href.split('?');
			let queryString = splitUrl.slice(1).join('?');
			const hrefParams = new URLSearchParams(queryString);
			let hrefValue = hrefParams.get('page');
			if (hrefValue === activeUrl) {
				page.active = true;
			} else {
				page.active = false;
			}
		});
		pages = pages;
	}

	const previous = () => {
		if (activeUrl > 1) {
			goto('/articles?page=' + (parseInt(activeUrl) - 1));
		}
	};
	const next = () => {
		if (activeUrl < pages.length) {
			goto('/articles?page=' + (parseInt(activeUrl) + 1));
		}
	};
</script>

<Section
	name="heroDefault"
	sectionClass="py-20 min-h-[calc(100vh-80px)] bg-[url('/src/lib/images/blob_2_light.svg')] dark:bg-[url('/src/lib/images/blob_2_dark.svg')] bg-cover bg-center bg-no-repeat"
>
	<HeroHeader>
		<svelte:fragment slot="h1">Disruptivist Articles</svelte:fragment>
		<svelte:fragment slot="paragraph"
			>Find out more about Philip Mackessy, and what is happening in the world of disruption.</svelte:fragment
		>
	</HeroHeader>

	<div
		class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
	>
		{#if data.user != undefined && data.user.article_permissions == true}
			<a href="/">
				<Button size="lg" outline pill>
					Write a new article <ArrowRightOutline size="md" class="ml-2 -mr-1" />
				</Button>
			</a>
		{/if}
	</div>
	<HeroBody>
		{#if data.articles != undefined}
			<div class="w-full flex flex-col items-center justify-center gap-5">
				{#each data.articles.items as article}
					<Card
						img="https://disruptivism.pockethost.io/api/files/articles/{article.id}/{article.preview}/"
						href="/articles/{article.id}"
						horizontal
						size="md"
						class="hover:scale-[1.01] border-2 hover:border-black dark:hover:border-white shadow-none hover:shadow-md  shadow-black dark:hover:shadow-white transition-all duration-300 cursor-pointer"
					>
						<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							{article.title}
						</h5>
						<div
							class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight flex-col md:flex-row"
						>
							<div class="p-2 border-b-2 border-ctp-text md:border-0">
								By: {article.expand.author.username}
							</div>
							<div class="p-2">{article.created}</div>
						</div>
					</Card>
				{/each}

				<Pagination {pages} on:previous={previous} on:next={next} icon>
					<svelte:fragment slot="prev">
						<span class="sr-only">Previous</span>
						<ChevronLeftOutline class="w-2.5 h-2.5" />
					</svelte:fragment>
					<svelte:fragment slot="next">
						<span class="sr-only">Next</span>
						<ChevronRightOutline class="w-2.5 h-2.5" />
					</svelte:fragment>
				</Pagination>
			</div>
		{:else}
			<div class="w-full h-full flex items-center justify-center text-2xl">
				No articles could be found
			</div>
		{/if}
	</HeroBody>
</Section>
