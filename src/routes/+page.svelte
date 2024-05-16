<script async>
	import { onMount } from 'svelte';
	import { Card, Button, Toggle } from 'flowbite-svelte';
	import {
		Section,
		News,
		HeroHeader,
		HeroBody,
		Quotes,
		Testimonial,
		TestimonialCard,
		TestimonialCardItem
	} from 'flowbite-svelte-blocks';
	import { Pagination } from 'flowbite-svelte';
	import { ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { fade } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';
	import { page } from '$app/stores';

	export let data;
</script>

<div
	class="h-[calc(100vh-80px)] w-full relative bg-[url('/src/lib/images/blob_1_light.svg')] dark:bg-[url('/src/lib/images/blob_1_dark.svg')] bg-cover bg-center bg-no-repeat p-10"
>
	<div class=" h-full w-full flex flex-col items-center justify-center gap-[3vw]">
		<div class=" place-self-center lg:col-span-7">
			<HeroHeader
				h1Class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
				pClass="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
			>
				<svelte:fragment slot="h1">Find Philip Mackessy.</svelte:fragment>
				<svelte:fragment slot="paragraph"
					>Find our lord and saviour through the power of Disruption. Join our community today. Find
					eternal salvation in Phillip Mackessy.</svelte:fragment
				>
			</HeroHeader>
		</div>
	</div>
</div>

<div
	class="min-h-[20vw] w-full relative flex flex-col items-center justify-center p-10 border-t-2 border-b-2 border-black dark:border-white"
>
	<Testimonial icon={Quotes}>
		<blockquote>
			<p class="text-2xl font-medium text-gray-900 dark:text-white">
				"Disruptivism is the best religion ever. Finding out about Philip Mackessy is one of the
				best things that ever happend to me. The Disruptor changed my life for the better in every
				single way imaginable"
			</p>
		</blockquote>
		<svelte:fragment slot="footer">
			<div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
				<div class="pr-3 font-medium text-gray-900 dark:text-white">Philip Mackessy</div>
				<div class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
					CEO at Mackessy Technology
				</div>
			</div>
		</svelte:fragment>
	</Testimonial>
</div>

<div class="flex flex-col items-center justify-center p-10">
	<div
		class="w-full px-10 flex flex-row items-center justify-center text-4xl text-black dark:text-white text-nowrap"
	>
		Recent Articles
	</div>
	<div class="h-[2px] w-72 m-2 bg-black dark:bg-white" />
	<div class="w-full p-10 flex flex-row flex-wrap items-center justify-center gap-5">
		{#if data.articles != undefined}
			{#each data.articles.items as article}
				<Card
					img="https://disruptivism.pockethost.io/api/files/articles/{article.id}/{article.preview}"
					class="hover:scale-[1.01] border-2 hover:border-black dark:hover:border-white shadow-none hover:shadow-md  shadow-black dark:hover:shadow-white transition-all duration-300 cursor-pointer"
					href="/articles/{article.id}"
				>
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{article.title}
					</h5>
				</Card>
			{/each}
		{/if}
	</div>
</div>
