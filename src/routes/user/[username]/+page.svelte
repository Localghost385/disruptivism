<script>
	export let data;
	import CenterBlock from '$lib/components/reusable/CenterBlock.svelte';

	let open_tab = 'articles';
</script>

<CenterBlock width={'40vw'}>
	{#if data.user != undefined}
		<div class="relative flex flex-row items-center justify-center w-full h-full">
			<img
				class="w-28 h-28 rounded-full"
				src="https://disruptivism.pockethost.io/api/files/users/{data.user_profile.id}/{data
					.user_profile.avatar}"
				alt="user avatar"
			/>
			<div class="ml-4 text-5xl text-ctp-text">{data.user_profile.username}</div>
			{#if data.user_profile.id == data.user.id}
				<a href="/user/{data.user_profile.username}/edit" class="absolute right-0 top-0 w-10">
					<img src="/images/settings.svg" alt="edit profile" />
				</a>
			{/if}
		</div>
		<div class=" flex flex-row justify-start">
			<div class="h-[1px] w-[40vw] bg-ctp-subtext0 m-4 origin-left" />
		</div>
		<div class="w-[40vw] flex flex-row items-center justify-evenly text-ctp-text text-3xl">
			{#if open_tab == 'articles'}
				<button on:click={() => (open_tab = 'articles')} class="text-ctp-lavender">Articles</button>
			{:else}
				<button
					on:click={() => (open_tab = 'articles')}
					class="hover:text-ctp-subtext0 transition-colors duration-300">Articles</button
				>
			{/if}
			{#if open_tab == 'posts'}
				<button on:click={() => (open_tab = 'posts')} class="text-ctp-lavender">Posts</button>
			{:else}
				<button
					on:click={() => (open_tab = 'posts')}
					class="hover:text-ctp-subtext0 transition-colors duration-300">Posts</button
				>
			{/if}
			{#if open_tab == 'replies'}
				<button on:click={() => (open_tab = 'replies')} class="text-ctp-lavender">Replies</button>
			{:else}
				<button
					on:click={() => (open_tab = 'replies')}
					class="hover:text-ctp-subtext0 transition-colors duration-300">Replies</button
				>
			{/if}
		</div>
		<div class=" flex flex-row justify-start">
			<div class="h-[1px] w-[40vw] bg-ctp-subtext0 m-4 origin-left" />
		</div>
		{#if open_tab == 'articles'}
			{#if data.user_profile.expand.articles != undefined}
				{#each data.user_profile.expand.articles as article}
					<a
						href="/articles/{article.id}"
						class="relative h-[5vw] w-full border-[1px] border-ctp-text my-2 mx-10 shadow-lg shadow-ctp-crust hover:drop-shadow-2xl transition-all duration-300 hover:bg-ctp-surface0 article-item"
					>
						<img
							src="https://disruptivism.pockethost.io/api/files/articles/{article.id}/{article.preview}"
							alt="test"
							class=" z-0 absolute top-0 left-0 h-[5vw] w-[8vw] object-cover brightness-50 articles-thumbnail transition-all duration-300 article-thumbnail"
						/>
						<div class="relative text-xl text-ctp-text ml-[9vw] mr-[1vw] top-1/2 -translate-y-1/2">
							<div>{article.title}</div>
							<div class="flex flex-row items-center justify-between">
								<div class="text-ctp-overlay2">By {article.expand.author.username}</div>
								<div class="text-ctp-overlay2">{article.created}</div>
							</div>
						</div>
					</a>
				{/each}
			{:else}
				<div class="text-3xl text-ctp-text">This user has no articles</div>
			{/if}
		{:else if open_tab == 'posts'}
			{#if data.user_profile.expand.posts != undefined}
				{#each data.user_profile.expand.posts as post}
					<div class="hidden" />
					<div
						class="relative h-[5vw] w-full border-[1px] p-[1vw] border-ctp-text my-3 mx-4 flex flex-row items-center"
					>
						<div
							class="mr-[1vw] display flex flex-row items-center justify-between gap-2 text-xl text-ctp-subtext0"
						>
							<div>{post.votes}</div>
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
			{:else}
				<div class="text-3xl text-ctp-text">This user has no posts</div>
			{/if}
		{:else if data.user_profile.expand.replies != undefined}
		{#each data.user_profile.expand.replies as reply}
		<div class="hidden" />
		<div
			class="relative h-[5vw] w-full border-[1px] p-[1vw] border-ctp-text my-3 mx-4 flex flex-row items-center"
		>
			<div
				class="mr-[1vw] display flex flex-row items-center justify-between gap-2 text-xl text-ctp-subtext0"
			>
				<div>{reply.votes}</div>
			</div>
			<a
				class="relative w-full text-xl text-ctp-text top-1/2 -translate-y-1/2"
				href="/discussion/{reply.post.id}"
			>
				<div>{reply.content}</div>
				<div class="flex flex-row items-center justify-between">
					<div class="text-ctp-overlay2">By {reply.expand.user.username}</div>
					<div class="text-ctp-overlay2">{reply.created}</div>
				</div>
			</a>
		</div>
	{/each}
		{:else}
			<div class="text-3xl text-ctp-text">This user has no replies</div>
		{/if}
	{:else}
		this user could not be found
	{/if}
</CenterBlock>
