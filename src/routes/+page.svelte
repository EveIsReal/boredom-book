<script lang="ts">
	import { onMount } from "svelte";
	import { authStore, userInfo } from "../stores";
	import { doc, getDoc } from "firebase/firestore";
	import { db } from "$lib/firebase";
	import Navbar from "../components/Navbar.svelte";
	import { page } from "$app/stores";

	const handleClick = async () => {
		if($page.data.user) {

		}
		console.log($page.data.user);
	}

</script>

<nav class="navbar">
	{#if $page.data.user}
		<form action="/logout" method="POST" class="navbar-btn">
			<button type="submit">
				Log out
			</button>
		</form>
	{/if}
</nav>
<p> Welcome, {$page.data.user?.displayName ?? "Loading..."}</p>

<div class="w-screen h-[100vh] flex">
	<div class="section w-[30vw]">
		Navbar
		<Navbar/>
	</div>
	<div class="section w-full">
		Feed
	</div>
	<div class="section w-[30vw]">Freunde</div>
</div>


<style global lang="scss">

	
    .navbar {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		width: 100vw;
		background-color: #202020;
		padding: 15px;
		margin: 0;
	}

	.navbar-btn {
		padding: 10px;
		background-color: #004d38;
		color: white;
		border-radius: 5px;
	}
</style>