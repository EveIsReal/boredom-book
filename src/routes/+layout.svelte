<script lang="ts">
	import "../app.scss"
	import { auth } from "$lib/firebase";
	import { authStore, userInfo } from "../stores";
	import { dbHandler } from "../utils";
	import { page } from "$app/stores";
	import { onMount } from "svelte";



</script>

<head>
    <script src="https://kit.fontawesome.com/d6931c1f6c.js" crossorigin="anonymous"></script>
</head>

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