<script>
	import CenterBlock from '$lib/components/reusable/CenterBlock.svelte';
	import { invalidateAll } from '$app/navigation';

	export let data;
	$: replies = data.post.expand.replies;
	$: user = data.user;

	let form;
	$: new_reply_loading = false;

	console.log(replies);

	function vote_inc(reply_id) {
		const formData = new FormData();
		formData.append('reply_id', reply_id);

		fetch('?/vote_inc', {
			method: 'POST',
			body: formData
		});
	}
	function vote_dec(reply_id) {
		const formData = new FormData();
		formData.append('reply_id', reply_id);

		fetch('?/vote_dec', {
			method: 'POST',
			body: formData
		});
	}

	function get_button_color(reply_id) {
		if (user.reply_votes.includes(reply_id)) {
			console.log('red');
			return 'border-ctp-red text';
		} else {
			console.log('blue');
			return 'border-ctp-subtext0';
		}
	}

	async function submit_reply(event) {
		event.preventDefault(); // Prevent default form submission

		if (form != undefined) {
			const formData = new FormData();
			form.querySelectorAll('input, textarea').forEach((input) => {
				formData.append(input.name, input.value);
			});
			form.reset();
			new_reply_loading = true;

			await fetch('?/submit', {
				method: 'POST',
				body: formData
			});

			invalidateAll();
		}
	}

	function new_reply_not_loading() {
		new_reply_loading = false;
		return '';
	}
</script>

<CenterBlock width={'40vw'} padding={'p-0'}>
	{#if data.post != undefined}
		<div class="w-full p-5">
			<div class=" text-4xl text-ctp-text flex flex-row items-start justify-start w-full">
				{data.post.title}
			</div>

			<div class=" text-ctp-overlay2 text-xl w-full">By {data.post.expand.user.username}</div>

			<div class=" text-ctp-subtext1 text-2xl mb-[1vw]">
				{@html data.post.content}
			</div>
		</div>
		<div
			class="w-[40vw] h-full border-[1px] border-ctp-text border-b- bg-ctp-base bg-opacity-60 backdrop-blur-xl flex flex-col items-center justify-between p-5 shadow-lg shadow-ctp-crust"
		>
			{#if user != undefined}
				<form
					action="?/submit"
					method="POST"
					enctype="multipart/form-data"
					class="flex flex-col items-center justify-evenly w-[38vw] gap-5 mb-[1vw] text-ctp-text"
					bind:this={form}
					on:submit={submit_reply}
				>
					<textarea
						name="content"
						placeholder="Content"
						class="h-[10vw] w-full p-2 bg-ctp-surface0 border-[1px] text-ctp-subtext0 border-ctp-subtext0 focus:outline-none focus:border-ctp-text"
					/>
					<input type="hidden" name="post_id" value={data.post.id} />
					<input
						type="submit"
						name="submit"
						value="Submit"
						class="h-10 w-full px-2 bg-ctp-surface0 border-[1px] hover:cursor-pointer text-ctp-subtext0 text-left border-ctp-subtext0 focus:outline-none focus:border-ctp-text"
					/>
				</form>
			{:else}
				<div class="text-3xl text-ctp-text mb-[1vw]">
					<a
						class="text-ctp-lavender hover:text-ctp-blue underline transition-colors duration-300"
						href="/login">Log in</a
					> to submit a reply.
				</div>
			{/if}

			<div class="w-[40vw] h-[1px] bg-ctp-text" />

			<button
				on:click={() => location.reload()}
				class="text-3xl text-ctp-lavender hover:text-ctp-blue transition-colors duration-300 mt-[2vw]"
			>
				Reload replies
			</button>

			<div class="w-full flex flex-col items-center justify-center mt-[1vw]">
				{#if new_reply_loading}
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
						<div class="text-3xl text-ctp-text ml-8">Creating your reply...</div>
					</div>
				{/if}
				{#if replies != undefined}
					{#each data.post.expand.replies as reply}
						<div class="hidden">
							{new_reply_not_loading()}
						</div>
						<div
							class="h-[5vw] w-full border-[1px] p-[1vw] border-ctp-text my-3 mx-4 flex flex-row items-center"
						>
							<div
								class="mr-[1vw] display flex flex-row items-center justify-between gap-2 text-xl text-ctp-subtext0"
							>
								{#if user != undefined}
									<button
										class="flex flex-row items-center justify-center gap-3"
										on:click={() => {
											if (user.reply_votes.includes(reply.id)) {
												user.reply_votes = user.reply_votes.filter((id) => id != reply.id);
												reply.votes--;
												vote_dec(reply.id);
											} else {
												user.reply_votes.push(reply.id);
												reply.votes++;
												vote_inc(reply.id);
											}
										}}
									>
										<div
											class="h-3 w-3 rotate-45 translate-y-1 border-l-2 border-t-2 {get_button_color(
												reply.id
											)}"
										/>

										{reply.votes}
									</button>
								{:else}
									<div>{reply.votes}</div>
								{/if}

								<div class="text-ctp-text w-full">{reply.content}</div>
								<div class="flex flex-row items-center justify-between">
									<div class="text-ctp-overlay2">By {reply.expand.user.username}</div>
								</div>
							</div>
						</div>
					{/each}
				{:else}
					<div class="text-3xl text-ctp-text">No replies were found</div>
				{/if}
			</div>
		</div>
	{:else}
		this post could not be found
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
