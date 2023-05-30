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

<div class="login row">
    <div class="column">
        <input bind:value={email} type="text" placeholder="Email" name="username">
    </div>
    <div class="column">
        <input bind:value={password} type="text" placeholder="Password" name="password">
    </div>
    <div class="column">
        <button on:click={registerNewUser}>Register</button>
    </div>
    <div class="column">
        <button>Login</button>
    </div>
    <div class="column">
        <button>Login with Google</button>
    </div>
</div>

<style>
    input {
        margin: 4pt;
        padding: 4pt;
    }
</style>

