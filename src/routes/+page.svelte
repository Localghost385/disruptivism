<script async>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';

	export let data;

	let loaded = false;

	onMount(() => {
		loaded = true;

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-grow');
				} else {
					entry.target.classList.remove('animate-grow');
				}
			});
		});
		const elements = document.querySelectorAll('.will-grow');
		elements.forEach((element) => observer.observe(element));
	});
</script>

<div
	class="bg-ctp-base h-[calc(100vh-80px)] w-screen flex flex-col items-center justify-center bg-[url('/src/lib/images/blob-scene-haikei.svg')] bg-no-repeat bg-cover"
>
	{#if loaded}
		<div
			transition:fade={{ duration: 500, delay: 200, easing: sineInOut }}
			class=" text-[5.5vw] text-ctp-text flex flex-row items-center justify-center"
		>
			<div>Disruptivism</div>
			<div class="w-[2px] h-[8vw] bg-ctp-subtext0 m-[2vw]" />
			<div>The Future</div>
		</div>
		<div
			transition:fade={{ duration: 500, delay: 800, easing: sineInOut }}
			class=" text-ctp-subtext1 text-[2vw] text-center"
		>
			Find our lord and saviour through the power of Disruption.<br />
			Join our community today.<br />
			Find eternal salvation in Phillip Mackessy.
		</div>
	{/if}
</div>
<div class=" bg-ctp-text h-[33vh] w-screen flex flex-row items-center justify-center">
	<div class="flex flex-col items-center justify-center">
		<div class="text-8xl text-ctp-surface0 uppercase">Achive complete disruption.</div>
		<div class="w-[90rem] flex flex-row justify-start">
			<div class="will-grow animate-grow h-[2px] w-[90rem] bg-ctp-surface0 m-2 origin-left" />
		</div>
	</div>
</div>
<div
	class=" bg-ctp-base h-[calc(67vh-80px)] w-screen flex flex-col items-center justify-center text-ctp-text text-5xl"
>
	<div class=" text-6xl">Disruptivist articles</div>
	<div class="w-[36rem] flex flex-row justify-start">
		<div class="h-[1px] w-[36rem] bg-ctp-subtext0 m-4 origin-left" />
	</div>
	<div class=" w-screen flex flex-row items-center justify-evenly m-2">
		{#if data.articles != undefined}
			{#each data.articles.items as articles}
				<a
					class="relative bg-ctp-base border-[1px] border-ctp-text articles-item shadow-lg shadow-ctp-crust hover:drop-shadow-2xl transition-all duration-300"
					href="/articles/{articles.id}"
				>
					<img
						class="w-[25vw] h-[15vw] saturate-50 opacity-80 brightness-50 articles-thumbnail transition-all duration-300"
						src="https://disruptivism.pockethost.io/api/files/articles/{articles.id}/{articles.preview}"
						alt={articles.title}
					/>
					<div
						class=" w-[20vw] mx-[2.5vw] text-4xl text-center absolute top-1/2 translate-y-[-50%]"
					>
						{articles.title}
					</div>
				</a>
			{/each}
		{:else}
			error
		{/if}
	</div>
</div>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
	* {
		font-family: 'Urbanist', sans-serif;
		font-optical-sizing: auto;
		font-weight: 300;
		font-style: normal;
	}
	.will-grow {
		transform-origin: left1;
		transform: scaleX(0);
		transition: transform 1.5s cubic-bezier(0.39, 0.575, 0.565, 1);
		transition-delay: 200ms;
	}
	.animate-grow {
		transform: scaleX(1);
		transition-delay: 0;
	}

	.articles-item:hover .articles-thumbnail {
		filter: brightness(75%);
	}
</style>
