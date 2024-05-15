<script>
	import Nav from '$lib/components/universal/nav.svelte';
	import Footer from '$lib/components/universal/footer.svelte';

	import '$lib/app.css';

	export let data;
</script>

<div class=" dark:bg-gray-900 transition-colors duration-300">
	<Nav {data} />

	<div class="hidden visible" />

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
