<script lang="ts">
    import { auth } from '$lib/auth'
    import backendSecretsUrl from '$lib/config';
    import type { UserCredential } from 'firebase/auth';

    export let currentUser: UserCredential | null

    let filterValue: string = "";
    let inputKey: string = "";
    let inputValue: string = "";
    let inputUrl: string = "";

    class Secret {
        key: string = ""
        value: string = ""
        url: string | undefined
        notes: string | undefined
    }

    let secrets: Secret[] = []
    $: shown = secrets.filter((s: Secret) => s.value.indexOf(filterValue) != -1)

    function getSecretsFromServer() {
        let user = currentUser as UserCredential
        return user.user.getIdToken().then(async token => {
            console.log(token)
            return fetch(backendSecretsUrl, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer" + token
                }
            })
            .then(resp => resp.json())
            .then(body => {
                secrets = body as Secret[]
            })
        });
    }

    function uploadSecret() {
        let user = currentUser as UserCredential
        return user.user.getIdToken().then(async token => {
            console.log(token)
            fetch(backendSecretsUrl, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer" + token
                },
                body: JSON.stringify({
                    value: inputValue,
                    key: inputKey,
                    url: inputUrl
                })
            })
            .then(resp => resp.json())
            .then(body => secrets = body)
        })
    }

    function logout() {
        currentUser = null
        auth.signOut()
    }

    getSecretsFromServer()
</script>

<style>
    input {
        width: 100%;
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
    .create {
        text-align: center;
        margin: auto;
    }
    .button-create {
        width: 100%;
    }
</style>

<html lang="en">
    <body>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" >
            <div class="modal-dialog model-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">New secret</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="inputKey" class="form-label">Name</label>
                            <input bind:value={inputKey} type="text" class="form-control" id="inputKey">
                        </div>
                        <div class="mb-3">
                            <label for="inputValue" class="form-label">Secret</label>
                            <input bind:value={inputValue} type="text" class="form-control" id="inputValue">
                        </div>
                        <div class="mb-3">
                            <label for="inputUrl" class="form-label">URL</label>
                            <input bind:value={inputUrl} type="text" class="form-control" id="inputUrl">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" on:click={uploadSecret}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="container p-3">
            <div class="row">
                <div class="col-10">
                    <h1 class="display-3">Manage your secrets</h1>
                </div>
                <div class="col d-flex align-items-center">
                    <button class="btn btn-info" on:click={logout}>Logout</button>
                </div>
            </div>
            <small class="text-body-secondary">Start typing to filter secrets and add new ones</small>

            <br/>
            <br/>

            <div class="container text-center">
                <div class="row">
                    <div class="input col-10">
                        <input bind:value={filterValue} type="text" placeholder="Add/Search Secrets" name="New Secret">
                    </div>
                    <div class="col create">
                        <button type="button" class="button-create btn btn-primary text-uppercase btn-outline" data-bs-toggle="modal" data-bs-target="#exampleModal">Create</button>
                    </div>
                </div>
            </div>
            <div class="secrets">
                {#each shown as secret}
                    <p>Name:{secret.key} Value:{secret.value}, Url:{secret.url}</p>
                {/each}
            </div>
        </div>
    </body>
</html>
