<script lang="ts">
	import { onMount } from "svelte";
	import { authStore, userInfo } from "../stores";
	import { doc, getDoc } from "firebase/firestore";
	import { db } from "$lib/firebase";
	import Navbar from "../components/Navbar.svelte";
	import { page } from "$app/stores";
	import type { PageData } from "./$types";
	import FriendList from "../components/FriendList.svelte";
	import FeedCard from "../components/FeedCard.svelte";
	import { dbHandler } from "../utils";

	export let data: PageData;

</script>

<div class="ui-wrapper">
	<div class="section nav-wrapper">
		<Navbar user={data.user} />
	</div>
	<div class="section feed-wrapper">
		<div class="feed">
			{#each {length: 10} as _}
				<FeedCard/>
			{/each}
		</div>
	</div>
	<div class="section nav-wrapper">
		<FriendList friends={data.user.friends}/>
	</div>
</div>


<style global lang="scss">

	body {
		margin: 0px;
	}	

	.ui-wrapper {
		// w-screen h-[100vh] flex
		width: 100%;
		height: 100vh;
		display: flex;
	}

	.feed-wrapper {
		width: 100%;
		height: 100vh;
	}

	.nav-wrapper {
		width: 30%;
		height: 100vh;
	}

	.feed {
		overflow: scroll;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.feed::-webkit-scrollbar {
		display: none;
	}

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