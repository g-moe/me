import type { Button as ButtonPrimitive } from 'bits-ui'

import { tv, type VariantProps } from 'tailwind-variants'

import Root from './button.svelte'

const buttonVariants = tv({
	base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary disabled:pointer-events-none disabled:opacity-50',
	defaultVariants: {
		size: 'default',
		variant: 'default'
	},
	variants: {
		size: {
			default: 'h-9 px-4 py-2',
			icon: 'h-9 w-9',
			lg: 'h-10 rounded-md px-8',
			sm: 'h-8 rounded-md px-3 text-xs'
		},
		variant: {
			default: 'bg-primary text-text-black shadow hover:bg-primary/90',
			destructive:
				'bg-system-error text-text-white shadow-sm hover:bg-system-error/90',
			ghost: 'hover:bg-neutral-e2/70 hover:text-neutral-e8',
			link: 'text-primary underline-offset-4 hover:underline',
			outline:
				'border border-neutral-e4 bg-transparent shadow-sm hover:bg-secondary hover:text-text-white',
			secondary: 'bg-secondary text-text-white shadow-sm hover:bg-secondary/80'
		}
	}
})

type Variant = VariantProps<typeof buttonVariants>['variant']
type Size = VariantProps<typeof buttonVariants>['size']

type Props = ButtonPrimitive.RootProps & {
	size?: Size
	variant?: Variant
}

export {
	Root,
	type Props,
	//
	Root as Button,
	type Props as ButtonProps,
	buttonVariants
}
