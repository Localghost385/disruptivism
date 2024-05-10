<script>
	export let data;
</script>

{#if data.user != undefined}
	<div>
		{data.user_profile[0].username}
	</div>
{:else}
	this user could not be found
{/if}
