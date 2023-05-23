import {error} from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({params}) {
    let resp = await getSecretsFromServer()
    let text = await resp.text()
    return { 
        text: text
    }
}

async function getSecretsFromServer() {
    return fetch("http://localhost:8080/secret")
}



