<script lang="ts">
	import { cn } from '$lib/utils.js'
	import { Button as ButtonPrimitive } from 'bits-ui'

	import { buttonVariants, type Props } from './index.js'

	type $$Props = Props

	let className: $$Props['class'] = undefined
	export let variant: $$Props['variant'] = 'default'
	export let size: $$Props['size'] = 'default'
	export { className as class }
</script>

<ButtonPrimitive.Root
	class={cn(
		buttonVariants({ size, variant }),
		'scale transition-all duration-200 hover:scale-125',
		className
	)}
	type="button"
	{...$$restProps}
>
	<slot />
</ButtonPrimitive.Root>
