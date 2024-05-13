<script>
	import { invalidate, invalidateAll } from '$app/navigation';
	export let data;
	$: posts = data.posts;
	$: user = data.user;

	let form;
	$: new_post_loading = false;

	function vote_inc(post_id) {
		const formData = new FormData();
		formData.append('post_id', post_id);

		fetch('?/vote_inc', {
			method: 'POST',
			body: formData
		});
	}
	function vote_dec(post_id) {
		const formData = new FormData();
		formData.append('post_id', post_id);

		fetch('?/vote_dec', {
			method: 'POST',
			body: formData
		});
	}

	function get_button_color(post_id) {
		if (user.post_votes.includes(post_id)) {
			console.log('red');
			return 'border-ctp-red';
		} else {
			console.log('blue');
			return 'border-ctp-subtext0';
		}
	}

	async function submit_post(event) {
		event.preventDefault(); // Prevent default form submission

		if (form != undefined) {
			const formData = new FormData();
			form.querySelectorAll('input, textarea').forEach((input) => {
				formData.append(input.name, input.value);
			});
			form.reset();
			new_post_loading = true;

			await fetch('?/submit', {
				method: 'POST',
				body: formData
			});

			invalidateAll();
		}
	}

	function new_post_not_loading() {
		new_post_loading = false;
		return '';
	}
</script>

<div
	class="top-0 z-[-1] w-screen h-min-content p-20 min-h-[calc(100vh-80px)] bg-ctp-base flex flex-col items-center justify-center bg-[url('/src/lib/images/blob-scene-haikei.svg')] bg-no-repeat bg-cover"
>
	{#if posts != undefined}
		<div
			class="relative w-[40vw] border-[1px] border-ctp-text bg-ctp-base bg-opacity-60 backdrop-blur-xl flex flex-col items-center justify-between p-5 shadow-lg shadow-ctp-crust"
		>
			{#if user != undefined}
				<form
					action="?/submit"
					method="POST"
					enctype="multipart/form-data"
					class="flex flex-col items-center justify-evenly w-[38vw] gap-5 mb-[1vw] text-ctp-text"
					bind:this={form}
					on:submit={submit_post}
				>
					<input
						type="text"
						name="title"
						placeholder="Title"
						autocomplete="off"
						class="h-10 w-full px-2 bg-ctp-surface0 border-[1px] border-ctp-subtext0 focus:outline-none focus:border-ctp-text"
					/>

					<textarea
						name="content"
						placeholder="Content"
						class="h-[10vw] w-full p-2 bg-ctp-surface0 border-[1px] text-ctp-subtext0 border-ctp-subtext0 focus:outline-none focus:border-ctp-text"
					/>
					<button
						type="submit"
						class="h-10 w-full px-2 bg-ctp-surface0 border-[1px] hover:cursor-pointer text-ctp-subtext0 text-left border-ctp-subtext0 focus:outline-none focus:border-ctp-text"
						>Submit Post</button
					>
				</form>
			{:else}
				<div class="text-3xl text-ctp-text mb-[1vw]">
					<a
						class="text-ctp-lavender hover:text-ctp-blue underline transition-colors duration-300"
						href="/login">Log in</a
					> to submit a post.
				</div>
			{/if}

			<div class="w-[40vw] h-[1px] bg-ctp-text" />

			<button
				on:click={() => location.reload()}
				class="text-3xl text-ctp-lavender hover:text-ctp-blue transition-colors duration-300 mt-[2vw]"
			>
				Reload Posts
			</button>

			<div class="w-full flex flex-col items-center justify-center mt-[1vw]">
				{#if new_post_loading}
					<div class="w-full h-full flex items-center justify-center">
						<div
							class="relative w-20 h-20 flex items-center justify-center transition-all duration-300"
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
						<div class="text-3xl text-ctp-text ml-8">Creating your post...</div>
					</div>
				{/if}
				{#each posts as post}
					<div class="hidden">
						{new_post_not_loading()}
					</div>
					<div
						class="relative h-[5vw] w-full border-[1px] p-[1vw] border-ctp-text my-3 mx-4 flex flex-row items-center"
					>
						<div
							class="mr-[1vw] display flex flex-row items-center justify-between gap-2 text-xl text-ctp-subtext0"
						>
							{#if user != undefined}
								<button
									class="flex flex-row items-center justify-center gap-3"
									on:click={() => {
										if (user.post_votes.includes(post.id)) {
											user.post_votes = user.post_votes.filter((id) => id != post.id);
											post.votes--;
											vote_dec(post.id);
										} else {
											user.post_votes.push(post.id);
											post.votes++;
											vote_inc(post.id);
										}
									}}
								>
									<div
										class="h-3 w-3 rotate-45 translate-y-1 border-l-2 border-t-2 {get_button_color(
											post.id
										)}"
									/>

									{post.votes}
								</button>
							{:else}
								<div>{post.votes}</div>
							{/if}
						</div>
						<a
							class="relative w-full text-xl text-ctp-text top-1/2 -translate-y-1/2"
							href="/discussion/{post.id}"
						>
							<div>{post.title}</div>
							<div class="flex flex-row items-center justify-between">
								<div class="text-ctp-overlay2">By {post.expand.user.username}</div>
								<div class="text-ctp-overlay2">{post.created}</div>
							</div>
						</a>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		No posts could be found
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
