<script>
	export let data;
</script>

<div
	class="sticky top-0 z-50 w-screen h-20 p-4 px-16 flex flex-row items-center justify-between bg-ctp-surface0 dark:bg-red-500 main text-ctp-text text-xl border-b-[1px] border-ctp-text"
>
	<a href="/" class="flex flex-row items-center justify-between">
		<img src="/images/logo.png" alt="missing" class="w-16" />
	</a>
	<div class="flex flex-row items-center gap-4">
		<a href="/" class="hover:text-ctp-subtext0 transition-colors duration-300">Home</a>
		<span class="w-[1px] h-8 bg-ctp-subtext1" />
		<a href="/discussion" class="hover:text-ctp-subtext0 transition-colors duration-300"
			>Discussion</a
		>
		<span class="w-[1px] h-8 bg-ctp-subtext1" />
		<a href="/articles" class="hover:text-ctp-subtext0 transition-colors duration-300">Articles</a>
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
					<div class="h-2 w-2 ml-2 rotate-45 border-b-[1px] border-r-[1px] border-ctp-text" />
				</button>
				<div class="dropdown-content hidden relative">
					<div
						class=" absolute left-[-0.5rem] top-0 flex flex-col items-start justify-start bg-ctp-surface0 border-[1px] border-ctp-text"
					>
						<form
							action="/logout"
							method="post"
							class="p-2 w-28 h-auto text-ctp-text hover:bg-ctp-surface1"
						>
							<button class=" h-full" type="submit">Logout</button>
						</form>
						<a
							href="/user/{data.user.username}"
							class="p-2 w-28 h-auto text-ctp-text hover:bg-ctp-surface1">profile</a
						>
					</div>
				</div>
			</div>
		{/if}
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
