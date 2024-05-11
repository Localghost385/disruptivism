<script>
	import CenterBlock from '$lib/components/reusable/CenterBlock.svelte';
</script>

<CenterBlock>
	<div class=" text-4xl text-ctp-text flex flex-row items-center justify-center">Log In</div>
	<form
		action="?/login"
		method="POST"
		class="flex flex-col items-center justify-evenly text-ctp-text text-xl"
	>
		<div class="flex flex-col justify-evenly m-1">
			<label for="email">
				<span>Email</span>
			</label>
			<input
				type="email"
				name="email"
				class="h-10 w-64 px-2 bg-ctp-surface0 border-[1px] border-ctp-subtext0 focus:outline-none focus:border-ctp-text"
			/>
		</div>
		<div class="flex flex-col justify-evenly m-1">
			<label for="password">
				<span>Password</span>
			</label>
			<input
				type="password"
				name="password"
				class="h-10 w-64 px-2 bg-ctp-surface0 border-[1px] border-ctp-subtext0 focus:outline-none focus:border-ctp-text"
			/>
		</div>

		<div>
			<button
				type="submit"
				class=" m-1 hover:text-ctp-subtext0 transition-colors duration-300 underline">Submit</button
			>
		</div>
	</form>
	<div class="text-ctp-text text-xl">
		Or <a
			class="text-ctp-lavender hover:text-ctp-blue underline transition-colors duration-300"
			href="/login">Sign Up</a
		> if you don't have an account yet.
	</div>
</CenterBlock>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
	* {
		font-family: 'Urbanist', sans-serif;
		font-optical-sizing: auto;
		font-weight: 300;
		font-style: normal;
	}
</style>
