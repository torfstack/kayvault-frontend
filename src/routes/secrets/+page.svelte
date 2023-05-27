<script lang="ts">
    import type { PageServerData } from './$types'

    export let data: PageServerData;
    let shown: Promise<string> = Promise.resolve(data.text)
    let value: string;

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
            .then(resp => {
                shown = resp.text()
            })
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
        border-radius: 8px;
    }
</style>

<html lang="en">
    {#await shown}
    <p>Loading your secrets...</p>
    {:then secrets}
    <p>Manage your secrets {secrets}<p>
    {/await}

    <input bind:value type="text" placeholder="Add Secret" name="New Secret" on:keypress={handleKeydown}>
</html>
