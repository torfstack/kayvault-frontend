import type { PageLoad } from './$types';

export const load = (async () => {
    const resp = await getSecretsFromServer()
    const text = await resp.json()
    return {
        secrets: text
    };
}) satisfies PageLoad


async function getSecretsFromServer(): Promise<Response> {
    return fetch("http://localhost:8080/secret")
}
