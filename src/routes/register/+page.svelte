<script lang="ts">
	import type { FirebaseError } from "firebase/app";
	import { authHandlers } from "../../stores";
	import { dbHandler } from "../../utils";

    let email: string, username: string, password: string, passwordConfirm: string, name: string, surname: string;

    let error: FirebaseError;
    let errorText: string;

    const handleSubmit = async () => {
        error = await authHandlers.signup(email, password, name ?? "TBD", surname ?? "TBD", username) as FirebaseError;
        
        switch(error.code) {
            case "auth/email-already-in-use":
                errorText = "Es existiert bereits ein Account mit dieser Email";
            break;
        }
        return true;
    }

</script>

<div class="flex justify-center items-center w-full h-screen">
    <div class="login-field">
        <img src="boredombook-logo.png" alt="boredombook-logo">
        <form method="POST" class="flex flex-col w-[50%] space-y-4">
            <input bind:value={username} required type="text" placeholder="Username" class="input" name="username" id="usernameInput">

            <input bind:value={email} type="email" name="email" required id="emailInput" placeholder="Email" class="input">

            <input bind:value={password} required type="password" placeholder="Passwort" class="input" name="password" id="passwordInput">

            <input bind:value={passwordConfirm} required type="password" placeholder="Passwort wiederholen" class="input" name="passwordConfirm" id="passwordConfirmInput">

            <input bind:value={name} type="text" name="name" id="nameInput" placeholder="Name (optional)" class="input">

            <input bind:value={surname} type="text" name="surname" id="surnameInput" placeholder="Nachname (optional)" class="input">

            <button type="submit" on:click={async () => {
                if(username && email && password && passwordConfirm) {
                    if(await handleSubmit()) {
                        await authHandlers.login(email, password);
                        window.location.href = "/";
                    }
                } else {
                    errorText = "Bitte fülle alle gewünschten Felder aus!";
                }
            }} class="submit-btn">
                Registrieren
            </button>
        </form>

        {#if errorText}
            <p class="error-text">{errorText ?? "Etwas ist schiefgelaufen!"}</p>
        {/if}

        <div class="flex flex-col justify-center items-center">
            <p>Bitte trage die gewünschten Daten ein.</p>
            <p>Du hast schon einen Account? Klicke <a href="/login">hier</a>, um dich anzumelden.</p>
        </div>
    </div>
</div>

<style lang="scss">
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