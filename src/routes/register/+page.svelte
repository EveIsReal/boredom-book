<script lang="ts">
	import { error } from "@sveltejs/kit";
	import type { ActionData } from "./$types";

    let username: string, password: string, passwordConfirm: string;

    export let form: ActionData;

</script>

<div class="flex justify-center items-center w-full h-screen">
    <div class="login-field">
        <img src="boredombook-logo.png" alt="boredombook-logo">
        <form method="POST" class="flex flex-col w-[50%] space-y-4">
            <input bind:value={username} required type="text" placeholder="Username" class="input" name="username" id="usernameInput">

            <input required bind:value={password} type="password" placeholder="Passwort" class="input" name="password" id="passwordInput">

            <input required bind:value={passwordConfirm} type="password" placeholder="Passwort wiederholen" class="input" name="passwordConfirm" id="passwordConfirmInput">

            <input type="text" name="name" id="nameInput" placeholder="Name (optional)" class="input">

            <input type="text" name="surname" id="surnameInput" placeholder="Nachname (optional)" class="input">

            <button type="submit" 
             disabled={/\s/g.test(username) || (!(password === passwordConfirm) && (password != null && passwordConfirm != null))}
             class:submit-btn={!(/\s/g.test(username) || (!(password === passwordConfirm) && (password != null && passwordConfirm != null)))} 
             class:disabled-btn={/\s/g.test(username) || (!(password === passwordConfirm) && (password != null && passwordConfirm != null))}
             
             >
                Registrieren
            </button>
        </form>

        {#if form?.error}
            <p class="error-text">{form.error.message}</p>
        {/if}

        {#if /\s/g.test(username)}
            <p class="error-text"> Der Username darf keine Leerzeichen enthalten. </p>
        {/if}

        {#if !(password === passwordConfirm) && (password && passwordConfirm)}
            <p class="error-text"> Die Passwörter stimmen nicht überein. </p>
        {/if}

        <div class="flex flex-col justify-center items-center">
            <p>Bitte trage die gewünschten Daten ein.</p>
            <p>Du hast schon einen Account? Klicke <a href="/login">hier</a>, um dich anzumelden.</p>
        </div>
    </div>
</div>

<style lang="scss">

    .disabled-btn {
        cursor: not-allowed;
        padding: 8px;
        background-color: rgb(56, 93, 146);
        border-radius: 5px;
        margin-top: 25px;
    }

    .login-field {
        display: flex;
        flex-direction: column;
        background-color: #202020;
        max-width: 750px;
        max-height: 750px;
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
        color: rgb(255, 61, 61);
    }
</style>