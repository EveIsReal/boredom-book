<script>
	import "../app.scss"
	import { auth } from "$lib/firebase";
	import { authStore, userInfo } from "../stores";
	import { dbHandler } from "../utils";
	import { page } from "$app/stores";


    auth.onAuthStateChanged(async user => {
        authStore.set({currentUser: user, isLoading: false});
        const userDoc = await dbHandler.getUser(user?.uid);
        
    })

</script>

<slot/>
<!-- <footer class="footer">
    © 2023 - Boredombook
</footer> -->

<style lang="scss">
    // .footer {
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    //     margin-bottom: 10px;
    //     color: rgb(178, 178, 178);
    // }
</style>