<script>
	function upvote(post_id) {
		console.log(data.user);
		if (data.user.post_upvotes.includes(post_id)) {
			return;
		} else if (data.user.post_downvotes.includes(post_id)) {
			//remove downvote
			data.user.post_downvotes = data.user.post_downvotes.filter((x) => x != post_id);
			data.user.post_upvotes = data.user.post_upvotes.push(post_id);

			let post = data.pb.collection('posts').getOne(post_id);
			post.votes += 1;
		} else {
			data.user.post_upvotes = data.user.post_upvotes.push(post_id);
			let post = data.pb.collection('posts').getOne(post_id);
			post.votes += 1;
		}
	}

	export let data;
</script>

<div
	class="top-0 z-[-1] w-screen h-min-content p-20 min-h-[calc(100vh-80px)] bg-ctp-base flex flex-col items-center justify-center bg-[url('/src/lib/images/blob-scene-haikei.svg')] bg-no-repeat bg-cover"
>
	{#if data.posts != undefined}
		<div
			class="relative w-[40vw] border-[1px] border-ctp-text bg-ctp-base bg-opacity-60 backdrop-blur-xl flex flex-col items-center justify-between p-5 shadow-lg shadow-ctp-crust"
		>
			{#each data.posts as post}
				<div
					class="relative h-[5vw] w-full border-[1px] p-[1vw] border-ctp-text my-3 mx-4 flex flex-row items-center"
				>
					<div class="mr-[1vw] display flex flex-row items-center justify-between gap-2">
						<button on:click={() => upvote(post.id)}>up</button>
						<div>{post.votes}</div>
						<button>down</button>
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
