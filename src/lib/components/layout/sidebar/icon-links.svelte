<script lang="ts">
	import { Code, MessageCircle } from '@lucide/svelte'
	import { Button } from '$lib/components/ui/button'
</script>

<Button
	aria-label="GitHub"
	class="text-neutral-e8 rounded-full bg-transparent p-2"
	href="https://github.com/g-moe"
	rel="noopener noreferrer"
	target="_blank"
	variant="ghost"
>
	<Code />
</Button>

<Button
	aria-label="X"
	class="text-neutral-e8 inline-block rounded-full bg-transparent p-2"
	href="https://x.com/gmoe_ix"
	rel="noopener noreferrer"
	target="_blank"
	variant="ghost"
>
	<MessageCircle />
</Button>
