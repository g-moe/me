<script lang="ts">
	import SidebarDesktop from './sidebar-desktop.svelte'
	import SidebarMobile from './sidebar-mobile.svelte'
</script>

<div class="hidden md:contents">
	<SidebarDesktop />
</div>

<div class="md:hidden">
	<SidebarMobile />
</div>
