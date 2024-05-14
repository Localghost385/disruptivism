<script>
	export let data;

	$: avatar_preview = undefined;
	let avatar_preview_name = undefined;

	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function (e) {
				const imageElement = document.querySelector('#avatar_preview');
				if (imageElement) {
					imageElement.width = 100;
					imageElement.height = 100;
					imageElement.src = e.target.result;
				}
			};

			reader.readAsDataURL(input.files[0]);
		}
	}
</script>

<div class="w-full h-full flex items-center justify-center">
	<form
		action="?/update_profile"
		method="POST"
		enctype="multipart/form-data"
		class="flex flex-col items-center justify-evenly w-full gap-5"
	>
		<div class="flex flex-col justify-evenly m-1">
			<label for="username">
				<span>Username</span>
			</label>
			<input
				type="text"
				name="username"
				class="h-10 w-64 px-2 bg-ctp-surface0 border-[1px] border-ctp-subtext0 focus:outline-none focus:border-ctp-text"
				value={data.user.username}
				autocomplete="off"
			/>
		</div>

		<div class="flex flex-col justify-evenly m-6">
			<label for="avatar">
				<span>Profile Picture</span>
			</label>
			<label
				class="bg-ctp-surface0 border-[1px] border-ctp-subtext0 hover:cursor-pointer focus:outline-none focus:border-ctp-text w-64"
			>
				<input
					type="file"
					name="avatar"
					class="hidden"
					on:change={(e) => (readURL(e.target), (avatar_preview_name = e.target.files[0].name))}
				/>
				<div class=" leading-[2.5rem] h-10 w-full px-2 text-ctp-subtext0">
					{avatar_preview_name || 'Upload a profile picture'}
				</div>
			</label>

			<div class="flex flex-row items-center justify-between p-2">
				<img
					class=" w-20 h-20 rounded-lg border-2 border-ctp-text"
					src="https://disruptivism.pockethost.io/api/files/users/{data.user.id}/{data.user.avatar}"
					alt=""
				/>
				<div class=" w-5 h-5 border-r-[2px] border-t-[2px] border-ctp-subtext0 rotate-45" />
				<img
					id="avatar_preview"
					class="w-20 h-20 rounded-lg border-2 border-ctp-text"
					src="#"
					alt=" "
					bind:this={avatar_preview}
				/>
			</div>
		</div>
		<input
			type="submit"
			name="submit"
			value="Submit"
			class="h-10 w-64 px-2 bg-ctp-surface0 border-[1px] hover:cursor-pointer text-ctp-subtext0 text-left border-ctp-subtext0 focus:outline-none focus:border-ctp-text"
		/>
	</form>
</div>
