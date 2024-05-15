<script>
	import { fade } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';

	import CenterBlock from '$lib/components/reusable/CenterBlock.svelte';

	import Profile from './Profile.svelte';
	import Security from './Security.svelte';

	$: settings_tab = [
		'text-ctp-lavender',
		'text-ctp-text hover:text-ctp-subtext0',
		'text-ctp-text hover:text-ctp-subtext0',
		'text-ctp-text hover:text-ctp-subtext0'
	];

	let active_tab = 0;

	function update_tab(tab) {
		for (let i = 0; i < settings_tab.length; i++) {
			if (i == tab) {
				settings_tab[tab] = 'text-ctp-lavender';
			} else {
				settings_tab[i] = 'text-ctp-text hover:text-ctp-subtext0';
			}
		}
		active_tab = tab;
	}

	export let data;
</script>

<CenterBlock width={'40vw'}>
	<div class="flex flex-row w-[40vw] h-[25vw] items-center justify-center text-ctp-text text-xl">
		<div
			class="flex flex-col items-center justify-evenly gap-2 w-1/4 h-full border-r-[1px] border-r-ctp-subtext0"
		>
			<button
				class="transition-all duration-300 {settings_tab[0]}"
				on:click={() => {
					update_tab(0);
				}}>Profile</button
			>
			<button
				class="transition-all duration-300 {settings_tab[1]}"
				on:click={() => {
					update_tab(1);
				}}>Security</button
			>
			<button
				class="transition-all duration-300 {settings_tab[2]}"
				on:click={() => {
					update_tab(2);
				}}>Praise Disruptor</button
			>
			<button
				class="transition-all duration-300 {settings_tab[3]}"
				on:click={() => {
					update_tab(3);
				}}>Delete Account</button
			>
		</div>
		<div class="w-3/4 h-full">
			{#if active_tab == 0}
				<div
					class="w-full h-full"
					out:fade={{ duration: 300, easing: sineInOut }}
					in:fade={{ duration: 300, delay: 280, easing: sineInOut }}
				>
					<Profile content={data.user.username} {data} />
				</div>
			{:else if active_tab == 1}
				<div
					class="w-full h-full"
					out:fade={{ duration: 300, easing: sineInOut }}
					in:fade={{ duration: 300, delay: 280, easing: sineInOut }}
				>
					<Security content={data.user.username} {data} />
				</div>
			{:else if active_tab == 2}
				<div
					class="w-full h-full"
					out:fade={{ duration: 300, easing: sineInOut }}
					in:fade={{ duration: 300, delay: 280, easing: sineInOut }}
				>
					<Profile content={data.user.username} {data} />
				</div>
			{:else if active_tab == 3}
				<div
					class="w-full h-full"
					out:fade={{ duration: 300, easing: sineInOut }}
					in:fade={{ duration: 300, delay: 280, easing: sineInOut }}
				>
					<Profile content={data.user.username} {data} />
				</div>
			{/if}
		</div>
	</div>
</CenterBlock>
