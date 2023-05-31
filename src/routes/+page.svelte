<script lang="ts">
    import { createUserWithEmailAndPassword } from "firebase/auth";
    import { auth } from "../lib/auth"

    let email: string = "";
    let password: string = "";

    function registerNewUser() {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

</script>

<h1>KayVault</h1>
<p>Register or Login to manage your secrets</p>

<div class="container">
    <form>
        <div class="mb-3">
            <a class="btn btn-light text-uppercase btn-outline" href="#"><img src="https://img.icons8.com/color/16/000000/google-logo.png">Signup Using Google</a>
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
        <button type="submit" class="btn btn-primary">Login</button>
        <button type="submit" class="btn btn-secondary" on:click={registerNewUser}>Register</button>
    </form>
</div>

<style>
    input {
        margin: 4pt;
        padding: 4pt;
    }
</style>

