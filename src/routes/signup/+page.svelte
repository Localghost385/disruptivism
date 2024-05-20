<script>
	import { Section, Register } from 'flowbite-svelte-blocks';
	import { Button, Checkbox, Label, Input } from 'flowbite-svelte';
</script>

<div
	class="h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-[url('/src/lib/images/blob_1_light.svg')] dark:bg-[url('/src/lib/images/blob_1_dark.svg')] bg-cover bg-center bg-no-repeat p-10"
>
	<Section name="register" sectionClass=" w-full md:w-2/3 lg:w-1/3">
		<Register href="/">
			<svelte:fragment slot="top">
				<img class="w-8 h-8 mr-2" src="/images/logo.svg" alt="logo" />
				Disruptivism
			</svelte:fragment>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<form class="flex flex-col space-y-6" action="?/signup" method="POST">
					<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Sign up</h3>
					<Label class="space-y-2">
						<span>Your email</span>
						<Input type="email" name="email" placeholder="your@email.com" required />
					</Label>
					<Label class="space-y-2">
						<span>Your password</span>
						<Input
							type="password"
							name="password"
							placeholder="•••••"
							required
						/>
					</Label>
					<Label class="space-y-2">
						<span>Confirm password</span>
						<Input type="password" name="passwordConfirm" placeholder="•••••" required />
					</Label>
					<div class="flex items-start">
						<Checkbox>Remember me</Checkbox>
						<a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
							>Forgot password?</a
						>
					</div>
					<Button type="submit" class="w-full1">Sign in</Button>
					<p class="text-sm font-light text-gray-500 dark:text-gray-400">
						Already have an account? <a
							href="/login"
							class="font-medium text-primary-600 hover:underline dark:text-primary-500">Log in</a
						>
					</p>
				</form>
			</div>
		</Register>
	</Section>
</div>
