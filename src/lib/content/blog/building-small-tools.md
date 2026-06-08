---
title: Building Small Tools That Last
description: 'Placeholder post for now: notes on keeping side projects useful without turning them into oversized systems.'
date: '2026-06-01'
tags:
  - Projects
  - Programming
published: true
---

This is placeholder content for now.

The best small tools usually start with one clear job.

Instead of designing for every possible future, I like to ask a simpler question:
what does this need to do well today?

## Practical defaults

- Keep the interface obvious.
- Avoid configuration until the need is real.
- Make the common path fast.
- Leave room to delete code later.

That approach keeps a project easy to revisit after a few weeks away.

> A small tool should feel like a shortcut, not another system to maintain.

Here is a tiny example of the kind of code shape I prefer:

```ts
export function titleCase(value: string) {
	return value
		.split(' ')
		.map((word) => {
			return word.charAt(0).toUpperCase() + word.slice(1)
		})
		.join(' ')
}
```

The details change by project, but the goal stays the same: solve the real problem
with the least machinery that still feels solid.
