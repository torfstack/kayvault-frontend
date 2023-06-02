<script lang="ts">
    import type { PageData } from './$types'
    import { fade } from 'svelte/transition';

    export let data: PageData;
    let value: string = "";
    $: shown = data.secrets.filter((s: string) => s.indexOf(value) != -1)

    function uploadSecret(secret: string) {
        fetch("http://localhost:8080/secret", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                value: secret,
                key: "something"
            })
        })
        .then(resp => resp.json())
        .then(body => data = { secrets: body })
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.code == "Enter") {
            uploadSecret(value)
        }
    }
</script>

<style lang="scss">
    input {
        width: 80%;
        padding: 12px 20px;
        margin: 8px 0;
        font-weight: 300;
    }
    .input {
        text-align: center;
    }
    .secrets {
        text-align: center;
    }
</style>

<html lang="en">
    <div class="p-3">
        <h1 class="display-3">Manage your secrets</h1>
        <small class="text-body-secondary">Start typing to filter secrets or add new ones</small>

        <div class="container-fluid">
            <div class="input">
                <input bind:value type="text" placeholder="Add/Search Secrets" name="New Secret" on:keypress={handleKeydown}>
            </div>
        </div>
        <div class="secrets">
            {#each shown as secret}
                <p>{secret}</p>
            {/each}
        </div>
    </div>
</html>
