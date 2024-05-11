<script>
	import Nav from '$lib/components/universal/nav.svelte';
	import Footer from '$lib/components/universal/footer.svelte';
	import '$lib/app.css';

	import { beforeNavigate, afterNavigate } from '$app/navigation';

	let isLoading = false;

	beforeNavigate(() => (isLoading = true));
	afterNavigate(() => (isLoading = false));

	let ring_container = undefined;
	$: isLoading, toggle_ring_visibility();

	function toggle_ring_visibility() {
		console.log(ring_container);
		if (ring_container != undefined) {
			console.log(ring_container);
			ring_container.classList.toggle('visible');
		}
	}

	export let data;
</script>

<div class=" overflow-x-clip">
	<Nav {data} />

	<div
		class=" -z-10 fixed top-1/2 left-1/2 w-28 h-28 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all opacity-0 duration-300"
		bind:this={ring_container}
	>
		<div
			class="absolute border-2 rounded-full border-ctp-text w-[calc(100%-6px)] h-[calc(100%-6px)] border-t-[#0000] duration-[550ms] rings flex items-center justify-center"
		>
			<div
				class="absolute border-2 rounded-full border-ctp-text w-[calc(100%-6px)] h-[calc(100%-6px)] border-t-[#0000] duration-[550ms] rings flex items-center justify-center"
			>
				<div
					class="absolute border-2 rounded-full border-ctp-text w-[calc(100%-6px)] h-[calc(100%-6px)] border-t-[#0000] duration-[550ms] rings flex items-center justify-center"
				>
					<div
						class="absolute border-2 rounded-full border-ctp-text w-[calc(100%-6px)] h-[calc(100%-6px)] border-t-[#0000] duration-[550ms] rings flex items-center justify-center"
					>
						<div
							class="absolute border-2 rounded-full border-ctp-text w-[calc(100%-6px)] h-[calc(100%-6px)] border-t-[#0000] duration-[550ms] rings flex items-center justify-center"
						>
							<div
								class="absolute border-2 rounded-full border-ctp-text w-[calc(100%-6px)] h-[calc(100%-6px)] border-t-[#0000] duration-[550ms] rings flex items-center justify-center"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

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
	.rings {
		animation: rotate 4s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
	}

	.visible {
		opacity: 1;
		z-index: 50;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
