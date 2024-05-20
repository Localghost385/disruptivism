<script>
	import { invalidateAll } from '$app/navigation';
	import { Card } from 'flowbite-svelte';
	import { HeartOutline, HeartSolid } from 'flowbite-svelte-icons';
	import { Label, Input, Modal, Textarea, Select } from 'flowbite-svelte';
	let new_post_form = false;
	import { Section, HeroHeader, HeroBody } from 'flowbite-svelte-blocks';
	import { Pagination } from 'flowbite-svelte';
	import { Button } from 'flowbite-svelte';
	import { ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data;

	$: posts = data.posts.items;
	$: user = data.user;

	$: posts.length, update_load_icon();

	let form;

	$: new_post_form = false;

	$: new_post_loading = false;
	$: deleting_post = false;

	$: activeUrl = $page.url.searchParams.get('page');
	console.log(activeUrl);

	if (activeUrl == undefined) {
		activeUrl = 1;
	}

	let pages = [];

	if (data.posts != undefined) {
		for (let i = 1; i < data.posts.totalPages + 1; i++) {
			pages.push({ name: i, href: '/discussion?page=' + i });
			if (i > 4) {
				break;
			}
		}
	}

	$: {
		pages.forEach((page) => {
			let splitUrl = page.href.split('?');
			let queryString = splitUrl.slice(1).join('?');
			const hrefParams = new URLSearchParams(queryString);
			let hrefValue = hrefParams.get('page');
			if (hrefValue === activeUrl) {
				page.active = true;
			} else {
				page.active = false;
			}
		});
		pages = pages;
	}

	const previous = () => {
		if (activeUrl > 1) {
			goto('/discussion?page=' + (parseInt(activeUrl) - 1));
		}
	};
	const next = () => {
		if (activeUrl < pages.length) {
			goto('/discussion?page=' + (parseInt(activeUrl) + 1));
		}
	};

	async function vote_inc(post_id) {
		const formData = new FormData();
		formData.append('post_id', post_id);

		await fetch('?/vote_inc', {
			method: 'POST',
			body: formData
		});
	}
	async function vote_dec(post_id) {
		const formData = new FormData();
		formData.append('post_id', post_id);

		await fetch('?/vote_dec', {
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
		console.log('submitting post');
		event.preventDefault(); // Prevent default form submission

		if (form != undefined) {
			//close modal
			new_post_form = false;

			new_post_loading = true;

			const formData = new FormData();
			form.querySelectorAll('input, textarea').forEach((input) => {
				formData.append(input.name, input.value);
			});
			form.reset();

			await fetch('?/submit', {
				method: 'POST',
				body: formData
			});

			invalidateAll();
		}
	}

	async function delete_post(post_id) {
		deleting_post = true;

		const formData = new FormData();
		formData.append('post_id', post_id);

		await fetch('?/delete', {
			method: 'POST',
			body: formData
		});
		invalidateAll();
	}

	async function ban_user(user_id) {
		const formData = new FormData();
		formData.append('user_id', user_id);

		await fetch('?/ban', {
			method: 'POST',
			body: formData
		});
	}

	function update_load_icon() {
		new_post_loading = false;
		deleting_post = false;

		return '';
	}

	function post_preview(input) {
		//get first 100 chars of post;
		if (input.length < 100) {
			return input.slice(0, 100);
		} else {
			return input.slice(0, 100) + '...';
		}
	}
</script>

<Modal
	id="new-post-modal"
	title="New Post"
	bind:open={new_post_form}
	outsideclose
	on:close={() => (new_post_form = false)}
	class="min-w-full"
>
	<form
		action="?/submit"
		method="POST"
		enctype="multipart/form-data"
		bind:this={form}
		on:submit={submit_post}
	>
		<div class="grid gap-4 mb-4 sm:grid-cols-2">
			<div>
				<Label for="title" class="mb-2">Title</Label>
				<Input type="text" id="title" name="title" placeholder="Post Title" required />
			</div>

			<div class="sm:col-span-2">
				<Label for="content" class="mb-2">Content</Label>
				<Textarea id="content" placeholder="Post content here" rows="4" name="content" required />
			</div>
			<Button type="submit" class="w-52">
				<svg
					class="mr-1 -ml-1 w-6 h-6"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
						clip-rule="evenodd"
					/></svg
				>
				Submit Post
			</Button>
		</div>
	</form>
</Modal>

<Section
	name="heroDefault"
	sectionClass="py-20 min-h-[calc(100vh-80px)] bg-[url('/src/lib/images/blob_2_light.svg')] dark:bg-[url('/src/lib/images/blob_2_dark.svg')] bg-cover bg-center bg-no-repeat"
>
	<HeroHeader>
		<svelte:fragment slot="h1">Disruptivist posts</svelte:fragment>
		<svelte:fragment slot="paragraph"
			>Find out more about Philip Mackessy, and what is happening in the world of disruption.</svelte:fragment
		>
	</HeroHeader>

	<div
		class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
	>
		<button
			on:click={() => {
				new_post_form = !new_post_form;
			}}
		>
			<Button size="lg" outline pill>
				Write a new post <ArrowRightOutline size="md" class="ml-2 -mr-1" />
			</Button>
		</button>
	</div>
	<HeroBody>
		{#if data.posts != undefined}
			<div class="w-full flex flex-col items-center justify-center gap-5">
				{#each posts as post}
					<Card
						size="md"
						class="hover:scale-[1.01] border-2 hover:border-black dark:hover:border-white shadow-none hover:shadow-md  shadow-black dark:hover:shadow-white transition-all duration-300"
					>
						<a href="/discussion/{post.id}">
							<h5 class="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
								{post.title}
							</h5>
							<div
								class="font-normal text-gray-700 dark:text-gray-400 leading-tight flex flex-row justify-between border-b-[1px] border-gray-300 dark:border-gray-600 pb-3"
							>
								<a
									href="/user/{post.expand.user.username}"
									class="underline text-primary-500 hover:text-primary-700"
									>{post.expand.user.username}</a
								>
								<div>{post.created}</div>
							</div>
							<div class="p-2 text-xl">
								{post_preview(post.content)}
							</div>
						</a>
						<div class="border-t-[1px] border-gray-300 dark:border-gray-600 pt-3">
							<div class="flex flex-row justify-between">
								{#if user != undefined}
									<button
										class="flex flex-row items-center justify-center gap-3 text-xl text-primary-500 hover:text-primary-700"
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
										{#if user.post_votes.includes(post.id)}
											<HeartSolid size="lg" />
										{:else}
											<HeartOutline size="lg" />
										{/if}

										<div class=" text-black dark:text-white">
											{post.votes}
										</div>
									</button>
								{:else}
									<div>{post.votes}</div>
								{/if}

								<div class="flex flex-row gap-2">
									{#if user.id == post.expand.user.id || user.discussion_moderator == true}
										<button
											class="text-primary-500 hover:text-primary-700 underline"
											on:click={() => delete_post(post.id)}>delete</button
										>
									{/if}
									{#if user.discussion_moderator == true}
										<button
											class="text-primary-500 hover:text-primary-700 underline"
											on:click={() => ban_user(post.expand.user)}>ban</button
										>
									{/if}
								</div>
							</div>
						</div>
					</Card>
				{/each}

				<Pagination {pages} on:previous={previous} on:next={next} icon>
					<svelte:fragment slot="prev">
						<span class="sr-only">Previous</span>
						<ChevronLeftOutline class="w-2.5 h-2.5" />
					</svelte:fragment>
					<svelte:fragment slot="next">
						<span class="sr-only">Next</span>
						<ChevronRightOutline class="w-2.5 h-2.5" />
					</svelte:fragment>
				</Pagination>
			</div>
		{:else}
			<div class="w-full h-full flex items-center justify-center text-2xl">
				No posts could be found
			</div>
		{/if}
	</HeroBody>
</Section>
