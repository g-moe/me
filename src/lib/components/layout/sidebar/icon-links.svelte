<script lang="ts">
	import { Github, Mail, Twitter } from '@lucide/svelte'
	import { Button } from '$lib/components/ui/button'
</script>

<Button
	aria-label="GitHub"
	class="text-netural-e8 rounded-full bg-transparent p-2"
	href="https://github.com/g-moe"
	rel="noopener noreferrer"
	target="_blank"
	variant="ghost"
>
	<Github />
</Button>

<Button
	aria-label="Twitter"
	class="text-netural-e8 inline-block rounded-full bg-transparent p-2"
	href="https://x.com/gmoe_ix"
	rel="noopener noreferrer"
	target="_blank"
	variant="ghost"
>
	<Twitter />
</Button>
