<script>
	import {
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterBrand,
		FooterLink
	} from 'flowbite-svelte';
</script>

<Footer footerType="logo" class="border-t-2 border-black dark:border-white rounded-none">
	<div class="sm:flex sm:items-center sm:justify-between">
		<FooterBrand href="/" src="/images/logo.svg" alt="Logo" name="Disruptivism" />
		<FooterLinkGroup
			ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400"
		>
			<FooterLink href="/license">Licensing</FooterLink>
			<FooterLink href="/">Contact</FooterLink>
		</FooterLinkGroup>
	</div>
	<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
	<FooterCopyright href="/" by="The Church of Disruptivism" year={2024} />
</Footer>
