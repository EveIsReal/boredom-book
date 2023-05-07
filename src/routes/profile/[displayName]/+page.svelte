<script lang="ts">
	import { onMount } from "svelte";
	import { dbHandler } from "../../../utils";
	import type { PageData } from "./$types";

    export let data: PageData;
    const user = data.user;
    let pfpURL: string;
    onMount(async () => {
        pfpURL = await dbHandler.getUserPfpURL(data.user?.uid ?? "/default_pfp.jpg");
    });
</script>

{#if user}
    <p> Username: {data.user?.displayName}</p>
    <p> Name: {user?.name}</p>
    <p> User-ID: {user?.uid} </p>
    <p> Profile-Picture: </p>
    <img src={`${pfpURL}`} width="75" alt="pfp">
    <p>Permitted: {data.permitted}</p>
{:else}
    <p>{data.error.message}</p>
{/if}