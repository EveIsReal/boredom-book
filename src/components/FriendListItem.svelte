<script lang="ts">
	import { dbHandler } from "../utils";

    export let user: App.IUser;
    export let pfp: string;
</script>

<a href={`/profile/${user.displayName.toLowerCase()}`} class="friend-card">
    <img src={pfp} class="rounded-full mr-5" width="40" alt="">
    <p class="mr-4">{user.displayName}</p>
    {#if true}
        <i class="fa-solid fa-circle" style="color: #00ff04;"></i>
    {:else}
        <i class="fa-solid fa-circle" style="color: #545454;"></i>
    {/if}
</a>

<style>
    .friend-card {
        margin-top: 15px;
        background-color: #151515;
        border-radius: 10px;
        display: flex;
        align-items: center;
        padding: 15px;
        font-size: 13pt;
        transition: all .2s;
    }

    .friend-card:hover {
        -webkit-box-shadow: 5px 5px 14px 5px rgba(0,77,56,0.5); 
        box-shadow: 5px 5px 14px 5px rgba(0,77,56,0.5);
        background-color: #181818;
        border-radius: 15px;
    }
</style>