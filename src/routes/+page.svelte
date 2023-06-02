<script lang="ts">
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
    import { auth } from "../lib/auth"

    let email: string = "";
    let password: string = "";

    function registerNewUser(): void {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    function loginUser(): void {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                routeToSecrets()
            })
            .catch((error) => {
                // email and password did not match
            });
    }

    function signInWithGoogle(): void {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider).then((content) => {
        });
    }

    function routeToSecrets() {
        window.location.href="/secrets"
    }

</script>

<div class="p-3">

    <h1 class="display-3">KayVault</h1>
    <small class="text-body-secondary">Login or register to manage your secrets</small>

    <br>
    <br>

    <div class="container border rounded bg-light p-3">
        <form>
            <div class="mb-3">
                <button class="btn btn-secondary text-uppercase btn-outline" on:click={signInWithGoogle}><img src="https://img.icons8.com/color/16/000000/google-logo.png">Signup Using Google</button>
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input bind:value={email} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" class="form-text">We use Firebase Authentication to store user login information.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input bind:value={password} type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Remember me</label>
            </div>
            <button type="submit" class="btn btn-primary" on:click={loginUser}>Login</button>
            <button type="submit" class="btn btn-secondary" on:click={registerNewUser}>Register</button>
        </form>
    </div>
</div>

<style>
    input {
        margin: 4pt;
        padding: 4pt;
    }
</style>
