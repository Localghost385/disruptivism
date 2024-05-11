<script>
	export let loading = false;
	let ring_container = undefined;
	$: loading, toggle_ring_visibility();

	function toggle_ring_visibility() {
		console.log(ring_container);
		if (ring_container != undefined) {
			console.log(ring_container);
			ring_container.classList.toggle('visible');
		}
	}
</script>

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

<style>
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
