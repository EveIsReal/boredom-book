<script lang="ts">
	import type { Action, ActionData, PageData } from "./$types";
    import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";
    import { superForm } from "sveltekit-superforms/client";
	import { authHandlers } from "../../stores";
	import { redirect } from "@sveltejs/kit";
	import { get } from "svelte/store";
    import { authStore } from "../../stores";

    // export let form;

    let email: string, password: string;
    let error: string;

    export let form: ActionData;
    

</script>

<div class="flex justify-center items-center w-full h-screen">
    <div class="login-field">
        <img src="boredombook-logo.png" alt="boredombook-logo">
        <form method="POST" class="flex flex-col space-y-4">
            <input bind:value={email} required type="text" placeholder="Name" class="input" name="name" id="nameInput">
            
            <input bind:value={password} required type="password" placeholder="Passwort" class="input" name="password" id="passwordInput">
            
            <button type="submit" class="submit-btn">
                Login
            </button>
            
        </form>

        {#if form?.error}
            <p class="error-text">{form.error.message}</p>
        {/if}

        <div class="flex flex-col justify-center items-center">
            <p>Bitte melde dich in einen Account an.</p>
            <p>Noch kein Account? Klicke <a href="/register">hier</a>, um dich zu registrieren.</p>
        </div>
    </div>
</div>

<style lang="scss">
    // .text-error {
    //     color: rgb(255, 65, 65);
    //     font-size: 11pt;
    //     font-weight: 200;
    // }

    .login-field {
        display: flex;
        flex-direction: column;
        background-color: #202020;
        max-width: 650px;
        max-height: 550px;
        height: 100vh;
        width: 100%;
        border-radius: 15px;
        padding: 12px;
        justify-content: space-evenly;
        align-items: center;
        box-shadow: 0px 7px 15px 2px #181818;
        color: rgb(230, 230, 230);
    }
    p {
        a {
            color: dodgerblue;
            text-decoration: underline;
        }
    }

    .submit-btn {
        padding: 8px;
        background-color: #006aff;
        border-radius: 5px;
        margin-top: 25px;
    }

    .error-text {
        color: rgb(255, 47, 47);
        font-size: 12pt;
    }
</style>