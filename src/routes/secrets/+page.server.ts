import type { PageServerLoad } from './$types';

export const load = (async () => {
    const resp = await getSecretsFromServer()
    const text = await resp.text()
    return {
        text: text
    };
}) satisfies PageServerLoad


async function getSecretsFromServer(): Promise<Response> {
    return fetch("http://localhost:8080/secret")
}
