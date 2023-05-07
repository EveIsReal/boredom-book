<script lang="ts">
	import { onMount } from "svelte";
	import { currentUser } from "../stores";
	import { dbHandler } from "../utils";

    export let user: App.IUser;
    // let url: string;
    // onMount(async () => {
    //     url = await dbHandler.getUserPfpURL(user.uid);
    // })


</script>

<div class="navbar">
    <div class="nav-items">

        <img src="boredombook-logo.png" class="mb-24" alt="site-logo">

        <div class="nav-item">
            <i class="fa-regular fa-heart fa-xl"></i>
            <p class="ml-4">
                Liked
            </p>
        </div>
        <a class="nav-item" href={`/profile/${user.displayName.toLowerCase()}`}>
            <div class="object-cover rounded-full ">
                {#await dbHandler.getUserPfpURL(user.uid)}
                    <img src="default_pfp.jpg" class="rounded-full" width="40" alt="">
                {:then url} 
                    <img src={url} alt="user avatar-url" class="rounded-full" width="40">
                {/await}
            </div>
            <p class="ml-4">Profil</p>
        </a>

    </div>
    <div>
        <form method="POST" action="/logout">
            <button class="profile-btn" type="submit">
                <div class="flex items-center space-x-2 ">
                    <h1>Log out</h1>
                </div>
            </button>
        </form>
    </div>
</div>

<style>

    .profile-btn {
        background: rgb(69, 69, 222);
        padding: 15px;
        text-align: start;
        width: 100%;
    }

    .nav-items {
        overflow: scroll;
        height: 88vh;
        width: 100%;
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

    .nav-item {
        background-color: transparent;
        margin-top: 5px;
        margin-bottom: 5px;
        padding: 15px;
        font-size: larger;
        font-weight: 400;
        transition: all .3s;
        border-radius: 25px;
        max-width: 90%;
        display: flex;
        align-items: center;
    }
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


    .nav-item:hover {
        transition: all .3s;
        background-color: #404040;
        letter-spacing: 1mm;
    }
</style>