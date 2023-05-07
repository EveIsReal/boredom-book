<script lang="ts">
	import type { ActionData, PageData } from "./$types";
    export let data: PageData;


</script>

<form action="?/upload" method="POST" enctype="multipart/form-data">
    <input required accept="image/*" type="file" name="file-upload" id="input" placeholder="file" />
    <button type="submit">upload</button>
</form>

{#if data.data.images[0]}
    <img src={data.data.images[0]} width="75" alt="">
{:else}
<img src="default_pfp.jpg" width="75" alt="">
{/if}