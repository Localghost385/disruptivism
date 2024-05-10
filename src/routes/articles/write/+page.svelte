<script>
	export let data;
	$: preview_value = 'Upload a thumbnail';
</script>

<div
	class="top-0 z-[-1] w-screen h-min-content p-20 min-h-[calc(100vh-80px)] bg-ctp-base flex flex-col items-center justify-center bg-[url('/src/lib/images/blob-scene-haikei.svg')] bg-no-repeat bg-cover"
>
	<div
		class="relative w-[40vw] border-[1px] text-ctp-subtext0 border-ctp-text bg-ctp-base bg-opacity-60 backdrop-blur-xl flex flex-col items-start justify-between p-5 shadow-lg shadow-ctp-crust"
	>
		{#if data.user != undefined && data.user.article_permissions == true}
			<div class=" text-4xl text-ctp-text flex flex-row items-center justify-center mb-6">
				Write a new article.
			</div>
			<form
				action="?/write"
				method="POST"
				enctype="multipart/form-data"
				class="flex flex-col items-center justify-evenly w-full gap-5"
			>
				<input
					type="text"
					name="title"
					placeholder="Title"
					class="h-10 w-full px-2 bg-ctp-surface0 border-[1px] border-ctp-subtext0 focus:outline-none focus:border-ctp-text"
				/>

				<label
					class="bg-ctp-surface0 border-[1px] border-ctp-subtext0 hover:cursor-pointer focus:outline-none focus:border-ctp-text w-full"
				>
					<input
						type="file"
						name="preview"
						class="hidden"
						on:change={(e) => (preview_value = e.target.files[0].name)}
					/>
					<div class=" leading-[2.5rem] h-10 w-full px-2 text-ctp-subtext0">
						{preview_value}
					</div>
				</label>
				<textarea
					name="content"
					placeholder="Content"
					class="h-[20vw] w-full p-2 bg-ctp-surface0 border-[1px] text-ctp-subtext0 border-ctp-subtext0 focus:outline-none focus:border-ctp-text"
				/>
				<input
					type="submit"
					name="submit"
					value="Submit"
					class="h-10 w-full px-2 bg-ctp-surface0 border-[1px] hover:cursor-pointer text-ctp-subtext0 text-left border-ctp-subtext0 focus:outline-none focus:border-ctp-text"
				/>
			</form>
		{:else}
			<div class=" text-3xl text-ctp-text">
				you do not have the permissions to write an article, do you need to <a
					class="text-ctp-lavender hover:text-ctp-blue underline transition-colors duration-300"
					href="/login">log in</a
				>?
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
</style>
