<script lang="ts">
	import { currentUser } from "../stores";
	import { dbHandler } from "../utils";

    // let items = [
    //     "Eins",
    //     "Zwei",
    //     "Drei"

	import FriendListItem from "./FriendListItem.svelte";

    // ];
    export let friends: (App.IUser | undefined )[];

</script>

<div class="navbar">
    <div class="nav-items">
        {#if friends.length > 0}
            {#each friends as friend}
                {#if friend}
                    {#await dbHandler.getUserPfpURL(friend.uid)}
                        <div class="w-full h-full flex flex-col justify-center items-center">
                            <i class="fa-solid fa-spinner fa-spin fa-2xl"></i>
                        </div>
                    {:then url}
                        <FriendListItem pfp={url} user={friend}/>
                    {/await}
                {:else}
                    <div class="w-full h-full flex flex-col justify-center items-center">
                        <h1 class="text-xl message-text">Keine Freunde  :(</h1>
                        <p class="text-center mt-3 message-text">Füge neue Freunde hinzu, die genau so langweilig sind wie du</p>
                    </div>
                {/if}
            {:else}
                <div class="w-full h-full flex flex-col justify-center items-center">
                    <h1 class="text-xl message-text">Keine Freunde  :(</h1>
                    <p class="text-center mt-3 message-text">Füge neue Freunde hinzu, die genau so langweilig sind wie du</p>
                </div>
            {/each}
        {:else}
            <div class="w-full h-full flex flex-col justify-center items-center">
                <h1 class="text-xl message-text">Keine Freunde  :(</h1>
                <p class="text-center mt-3 message-text">Füge neue Freunde hinzu, die genau so langweilig sind wie du</p>
            </div>
        {/if}
    </div>
</div>

<style>

    .message-text {
        color: #999999;

    }

    .nav-items {
        overflow: scroll;
        height: 88vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .navbar {
        padding: 15px;
        width: 100%;
        height: 100%;
        background-color: #202020;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    /* .nav-item {
        background-color: #303030;
        margin-top: 5px;
        margin-bottom: 5px;
        padding: 15px;
        font-size: larger;
        font-weight: 400;
        transition: all .3s;
        border-radius: 7px;
        max-width: 90%;
    } */
    .nav-items::-webkit-scrollbar {
        background-color: #202020;
        width: 10px;
        
    }

    .nav-items::-webkit-scrollbar-thumb {
        background-color: rgb(116, 116, 116);
        border-radius: 25px;
    }

    .nav-items::-webkit-scrollbar-corner {
        background-color: transparent;
    }


    /* .nav-item:hover {
        transition: all .3s;
        background-color: #404040;
        letter-spacing: 1mm;
    } */
</style>