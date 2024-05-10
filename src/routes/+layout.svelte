<script>
	import '$lib/app.css';

	export let data;
</script>
<div class="overflow-x-hidden">
	<div
		class="sticky top-0 z-50 w-screen h-20 p-4 px-16 flex flex-row items-center justify-between bg-ctp-surface0 dark:bg-red-500 main text-ctp-text text-xl border-b-[1px] border-ctp-text"
	>
		<a href="/" class="flex flex-row items-center justify-between">
			<img src="/images/logo.png" alt="missing" class="w-16" />
		</a>
		<div class="flex flex-row items-center gap-4">
			<a href="/" class="hover:text-ctp-subtext0 transition-colors duration-300">Home</a>
			<span class="w-[1px] h-8 bg-ctp-subtext1" />
			<a href="/join" class="hover:text-ctp-subtext0 transition-colors duration-300">How to Join</a>
			<span class="w-[1px] h-8 bg-ctp-subtext1" />
			<a href="/texts" class="hover:text-ctp-subtext0 transition-colors duration-300">Sacred Texts</a>
			<span class="w-[1px] h-8 bg-ctp-subtext1" />
			<a href="/about" class="hover:text-ctp-subtext0 transition-colors duration-300">About Us</a>
		</div>
		<div>
			{#if !data.user}
				<div class="flex flex-row items-center justify-center">
					<a href="/login" class=" hover:text-ctp-subtext0 transition-colors duration-300">login</a>
					<div class="m-2">or</div>
					<a href="signup" class=" hover:text-ctp-subtext0 transition-colors duration-300">signup</a>
				</div>
			{:else}
				<div class="dropdown">
					<button class="dropdown-title flex flex-row items-center justify-center">
						<div>{data.user.username}</div>
						<div class="h-2 w-2 ml-2 rotate-45 border-b-2 border-r-2 border-ctp-text" />
					</button>
					<div class="dropdown-content hidden relative">
						<div
							class=" absolute left-[-0.5rem] top-0 flex flex-col items-start justify-start bg-ctp-surface0 border-2 border-ctp-text"
						>
							<form
								action="/logout"
								method="post"
								class="p-2 w-28 h-auto text-ctp-text hover:bg-ctp-surface1"
							>
								<button type="submit">Logout</button>
							</form>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
	
	<slot />
	
	<div
		class="bottom-0 bg-ctp-surface0 border-t-[1px] border-ctp-text h-48 w-screen flex flex-col items-center justify-center p-4"
	>
		<div class="w-screen flex flex-row items-center justify-center">
			<div class="w-[30vw] h-[1px] bg-ctp-text" />
			<div class="flex flex-row items-center justify-center mx-6 my-2">
				<a href="/">
					<img src="/images/logo.png" alt="" class="mx-3 h-10" />
				</a>
				<a href="/">
					<img src="/images/logo.png" alt="" class="mx-3 h-10" />
				</a>
				<a href="/">
					<img src="/images/logo.png" alt="" class="mx-3 h-10" />
				</a>
				<a href="/">
					<img src="/images/logo.png" alt="" class="mx-3 h-10" />
				</a>
				<a href="/">
					<img src="/images/logo.png" alt="" class="mx-3 h-10" />
				</a>
			</div>
			<div class="w-[30vw] h-[1px] bg-ctp-text" />
		</div>
		<div class=" text-ctp-text text-3xl">Disruptivism</div>
		<div class=" text-ctp-text text-xs m-2">
			Copyright © 2024 Church of Disruptivism. All rights reserved.
		</div>
		<div class="flex flex-row items-center gap-4 text-ctp-subtext0">
			<a href="/" class="hover:text-ctp-subtext0 transition-colors duration-300">placeholder</a>
			<span class="w-[1px] h-4 bg-ctp-subtext1" />
			<a href="/" class="hover:text-ctp-subtext0 transition-colors duration-300">placeholder</a>
			<span class="w-[1px] h-4 bg-ctp-subtext1" />
			<a href="/" class="hover:text-ctp-subtext0 transition-colors duration-300">placeholder</a>
			<span class="w-[1px] h-4 bg-ctp-subtext1" />
			<a href="/" class="hover:text-ctp-subtext0 transition-colors duration-300">placeholder</a>
			<span class="w-[1px] h-4 bg-ctp-subtext1" />
			<a href="/" class="hover:text-ctp-subtext0 transition-colors duration-300">placeholder</a>
		</div>
	</div>
</div>
<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
	* {
		font-family: 'Urbanist', sans-serif;
		font-optical-sizing: auto;
		font-weight: 300;
		font-style: normal;
	}
	.dropdown:hover .dropdown-content {
		display: block;
	}
</style>
