<script lang="ts">
    import type { UserCredential } from "firebase/auth";
    import Login from "./login.svelte"
    import Secrets from "./secrets.svelte";

    let currentUser: UserCredential | null = null;
</script>

{#if currentUser}
    <Secrets bind:currentUser/>
{:else}
    <Login bind:currentUser/>
{/if}

<style>
    input {
        margin: 4pt;
        padding: 4pt;
    }
</style>
