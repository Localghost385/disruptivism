<script>
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem,
		DropdownDivider,
		DarkMode
	} from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	$: activeUrl = $page.url.pathname;

	$: hide_menu = true;

	export let data;
</script>

<Navbar class="sticky top-0 z-30 start-0 border-b-2 border-black dark:border-white">
	<div class=" flex flex-row items-center justify-between gap-[3vw]">
		<DarkMode class="self-center" />
		<NavBrand href="/">
			<img src="/images/logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
				>Disruptivism</span
			>
		</NavBrand>
	</div>
	<button
		on:click={() => {
			hide_menu = !hide_menu;
		}}
	>
		<NavHamburger onClick="" />
	</button>
	<NavUl hidden={hide_menu} {activeUrl}>
		<NavLi
			on:click={() => {
				hide_menu = true;
			}}
			href="/">Home</NavLi
		>
		<NavLi
			on:click={() => {
				hide_menu = true;
			}}
			href="/discussion">Discussion</NavLi
		>
		<NavLi
			on:click={() => {
				hide_menu = true;
			}}
			href="/articles">Articles</NavLi
		>
		<NavLi
			on:click={() => {
				hide_menu = true;
			}}
			href="/texts">Sacred Texts</NavLi
		>
		<NavLi
			on:click={() => {
				hide_menu = true;
			}}
			href="/about">About Us</NavLi
		>
		{#if !data.user}
			<NavLi href="/login">Login</NavLi>
			<NavLi href="/signup">Signup</NavLi>
		{:else}
			<NavLi class="cursor-pointer">
				{data.user.username}<ChevronDownOutline
					class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline"
				/>
			</NavLi>
			<Dropdown class="w-44 z-20 ">
				<DropdownItem href="/user/{data.user.username}">Profile</DropdownItem>
				<DropdownItem href="/user/{data.user.username}/edit">Settings</DropdownItem>
				<DropdownDivider />
				<DropdownItem class="cursor-pointer"
					><form action="/logout" method="post">
						<button type="submit" class="z-10">Logout</button>
					</form></DropdownItem
				>
			</Dropdown>
		{/if}
	</NavUl>
</Navbar>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
	* {
		font-family: 'Urbanist', sans-serif;
		font-optical-sizing: auto;
		font-weight: 300;
		font-style: normal;
	}
</style>
