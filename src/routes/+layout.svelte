<script>
	import Nav from '$lib/components/universal/nav.svelte';
	import Footer from '$lib/components/universal/footer.svelte';
	import '$lib/app.css';

	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import Loading from '$lib/components/universal/loading.svelte';

	let isLoading = false;

	beforeNavigate(() => (isLoading = true));
	afterNavigate(() => (isLoading = false));

	export let data;
</script>

<div class=" overflow-x-clip">
	<Nav {data} />

	<Loading loading={isLoading} />
	<slot />

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
