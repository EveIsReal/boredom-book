<script lang="ts">
	import { onMount } from "svelte";
	import { dbHandler } from "../../../utils";
	import type { PageData } from "./$types";

    export let data: PageData;
    const user = data.user;
    
</script>

{#if user}
    <p> Username: {data.user?.displayName}</p>
    <p> Name: {user?.name}</p>
    <p> User-ID: {user?.uid} </p>
    <p> Profile-Picture: </p>
    <img src={`${data.promisedData?.userPfpURL}`} width="75" alt="pfp">
    <p>Permitted: {data.permitted}</p>
    <pre>{JSON.stringify(data.user, null, 4)}</pre>
    
{:else}
    <div class="wrapper">
        <i class="fa-regular fa-face-frown fa-2xl mr-4"></i>
        <p class="">{data.error.message}</p>
    </div>
{/if}

<style>
    .wrapper {
        display: flex;
        width: 100%;
        height: 100vh;
        justify-content: center;
        align-items: center;
    }
</style>