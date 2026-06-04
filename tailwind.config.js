import scrollbar from 'tailwind-scrollbar'
import tailwindcssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: ['class'],
	plugins: [tailwindcssAnimate, scrollbar],
	theme: {
		container: {
			center: true,
			padding: '2rem'
		},
		extend: {
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'caret-blink': 'caret-blink 1.25s ease-out infinite'
			},
			backdropBlur: {
				xs: '2px',
				xxs: '1px'
			},
			backgroundImage: {
				spotlight:
					'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), var(--secondary), transparent 40%)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'even-accent': '0 0 4px 0 var(--secondary)'
			},
			colors: {
				neutral: {
					DEFAULT: 'var(--neutral)',
					e1: 'var(--neutral-e1)',
					e2: 'var(--neutral-e2)',
					e3: 'var(--neutral-e3)',
					e4: 'var(--neutral-e4)',
					e5: 'var(--neutral-e5)',
					e6: 'var(--neutral-e6)',
					e7: 'var(--neutral-e7)',
					e8: 'var(--neutral-e8)'
				},
				/* legacy typo — alias so existing `text-netural-*` classes resolve */
				netural: {
					DEFAULT: 'var(--neutral)',
					e1: 'var(--neutral-e1)',
					e2: 'var(--neutral-e2)',
					e3: 'var(--neutral-e3)',
					e4: 'var(--neutral-e4)',
					e5: 'var(--neutral-e5)',
					e6: 'var(--neutral-e6)',
					e7: 'var(--neutral-e7)',
					e8: 'var(--neutral-e8)'
				},
				primary: {
					DEFAULT: 'var(--primary)',
					e1: 'var(--primary-e1)',
					e2: 'var(--primary-e2)',
					h1: 'var(--primary-h1)',
					h2: 'var(--primary-h2)'
				},
				secondary: {
					DEFAULT: 'var(--secondary)',
					e1: 'var(--secondary-e1)',
					e2: 'var(--secondary-e2)',
					h1: 'var(--secondary-h1)',
					h2: 'var(--secondary-h2)'
				},
				system: {
					error: 'var(--system-error)',
					success: 'var(--system-success)',
					warning: 'var(--system-warning)'
				},
				test: 'var(--test)',
				text: {
					black: 'var(--text-black)',
					white: 'var(--text-white)'
				}
			},

			fontFamily: {
				default: ['Open Sans', 'system-ui', '-apple-system', 'sans-serif'],
				mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
			},
			fontSize: {
				base: '0.925rem',
				sm: '0.85rem',
				xl: '1.0rem',
				xs: '.75rem',
				xxl: '1.125rem',
				xxs: '.675rem',
				xxxl: '1.25rem',
				xxxs: '.6rem',
				xxxxl: '1.5rem',
				xxxxs: '.5rem'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--bits-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--bits-accordion-content-height)' },
					to: { height: '0' }
				},
				'caret-blink': {
					'0%,70%,100%': { opacity: '1' },
					'20%,50%': { opacity: '0' }
				}
			}
		}
	}
}
