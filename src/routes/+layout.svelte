<script>
	import Nav from '$lib/components/universal/nav.svelte';
	import Footer from '$lib/components/universal/footer.svelte';
	import Loader from '$lib/components/universal/loader.svelte';
	import { fade } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';

	import '$lib/app.css';

	import { beforeNavigate, afterNavigate } from '$app/navigation';

	let isLoading = false;

	beforeNavigate(() => (isLoading = true));
	afterNavigate(() => (isLoading = false));

	export let data;
</script>

<div class=" overflow-x-clip">
	<Nav {data} />

	<div class="hidden visible" />
	{#key data.pathname}
		<div class=" bg-ctp-base">
			<div
				in:fade={{ easing: sineInOut, duration: 300, delay: 200 }}
				out:fade={{ easing: sineInOut, duration: 200 }}
			>
				<slot />
			</div>
		</div>
	{/key}

	{#if isLoading}
		<div transition:fade={{ easing: sineInOut, duration: 200 }}>
			<Loader />
		</div>
	{/if}
	<Footer />
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
