import type { PageLoad } from './$types';
import { userHandler } from '$lib/user';

export const ssr = false;

export const load = (async () => {
    const resp = await getSecretsFromServer()
    const text = await resp.json()
    return {
        secrets: text
    };
}) satisfies PageLoad


async function getSecretsFromServer(): Promise<Response> {
    return userHandler.getCurrentUser().getIdTokenResult().then((result) => {
        var token = result.token
        return fetch("http://192.168.178.52:8080/secret", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });
    });
}
