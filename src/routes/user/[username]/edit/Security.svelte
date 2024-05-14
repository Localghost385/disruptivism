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
		action="?/update_password"
		method="POST"
		enctype="multipart/form-data"
		class="flex flex-col items-center justify-evenly w-full gap-5"
	>
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
		<div class="flex flex-col justify-evenly m-1">
			<label for="passwordConfirm">
				<span>Confirm Password</span>
			</label>
			<input
				type="password"
				name="passwordConfirm"
				class="h-10 w-64 px-2 bg-ctp-surface0 border-[1px] border-ctp-subtext0 focus:outline-none focus:border-ctp-text"
			/>
		</div>
		<input
			type="submit"
			name="submit"
			value="Submit"
			class="h-10 w-64 px-2 bg-ctp-surface0 border-[1px] hover:cursor-pointer text-ctp-subtext0 text-left border-ctp-subtext0 focus:outline-none focus:border-ctp-text"
		/>
	</form>
</div>
