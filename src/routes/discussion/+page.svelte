<script>
	function vote(post, up_or_down) {
		let change_amount = 0;

		if (up_or_down == 'up') {
			if (data.user.post_upvotes.includes(post.id)) {
				return;
			} else if (data.user.post_downvotes.includes(post.id)) {
				remove_vote_relation(post.id, 'down');
				add_vote_relation(post.id, 'up');
				change_amount = 2;
			} else {
				add_vote_relation(post.id, 'up');
				change_amount = 1;
			}
		}
		if (up_or_down == 'down') {
			if (data.user.post_downvotes.includes(post.id)) {
				return;
			} else if (data.user.post_upvotes.includes(post.id)) {
				remove_vote_relation(post.id, 'up');
				add_vote_relation(post.id, 'down');
				change_amount = -2;
			} else {
				add_vote_relation(post.id, 'down');
				change_amount = -1;
			}
		}

		const form_data = new FormData();
		form_data.append('action', 'vote');
		form_data.append('post_id', post.id);
		form_data.append('change_amount', change_amount);

		fetch('?/vote', {
			method: 'POST',
			body: form_data
		});

		post.vote_count += change_amount;
	}

	function remove_vote_relation(post_id, up_or_down) {
		const form_data = new FormData();
		form_data.append('action', 'remove_vote_relation');
		form_data.append('post_id', post_id);
		form_data.append('up_or_down', up_or_down);

		fetch('?/remove_vote_relation', {
			method: 'POST',
			body: form_data
		});
	}

	function add_vote_relation(post_id, up_or_down) {
		const form_data = new FormData();
		form_data.append('action', 'add_vote_relation');
		form_data.append('post_id', post_id);
		form_data.append('up_or_down', up_or_down);

		fetch('?/add_vote_relation', {
			method: 'POST',
			body: form_data
		});
	}

	export let data;

	$: posts = data.posts;
</script>

<div
	class="top-0 z-[-1] w-screen h-min-content p-20 min-h-[calc(100vh-80px)] bg-ctp-base flex flex-col items-center justify-center bg-[url('/src/lib/images/blob-scene-haikei.svg')] bg-no-repeat bg-cover"
>
	{#if data.posts != undefined}
		<div
			class="relative w-[40vw] border-[1px] border-ctp-text bg-ctp-base bg-opacity-60 backdrop-blur-xl flex flex-col items-center justify-between p-5 shadow-lg shadow-ctp-crust"
		>
			{#each posts as post}
				<div
					class="relative h-[5vw] w-full border-[1px] p-[1vw] border-ctp-text my-3 mx-4 flex flex-row items-center"
				>
					<div
						class="mr-[1vw] display flex flex-row items-center justify-between gap-2 text-xl text-ctp-subtext0"
					>
						<button
							on:click={() => {
								vote(post, 'up');
							}}>up</button
						>
						<div>{post.votes}</div>
						<button
							on:click={() => {
								vote(post, 'down');
							}}>down</button
						>
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
	{:else}
		this post could not be found
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
</style>
