<script lang="ts">
    import { auth } from '$lib/auth'
    import type { UserCredential } from 'firebase/auth';

    export let currentUser: UserCredential | null

    let value: string = "";
    let secrets: string[] = []
    $: shown = secrets.filter((s: string) => s.indexOf(value) != -1)

    function getSecretsFromServer() {
        let user = currentUser as UserCredential
        return user.user.getIdToken().then(async token => {
            console.log(token)
            return fetch("http://192.168.178.52:8080/secret", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer" + token
                }
            })
            .then(resp => resp.json())
            .then(body => secrets = body)
        });
    }

    function uploadSecret(secret: string) {
        let user = currentUser as UserCredential
        return user.user.getIdToken().then(async token => {
            console.log(token)
            fetch("http://192.168.178.52:8080/secret", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer" + token
                },
                body: JSON.stringify({
                    value: secret,
                    key: "something"
                })
            })
            .then(resp => resp.json())
            .then(body => secrets = body)
        })
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.code == "Enter") {
            uploadSecret(value)
        }
    }

    function logout() {
        currentUser = null
        auth.signOut()
    }

    getSecretsFromServer()
</script>

<style>
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
        <small class="text-body-secondary">Start typing to filter secrets and add new ones, or <a on:click={logout}>logout</a></small>

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
