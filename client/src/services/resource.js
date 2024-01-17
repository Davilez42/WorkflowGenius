export default async function resoruce({ route, body, method, tkn }) {
    const config_fetch = {
        method,
        mode: "cors",
        headers: {
            "Content-Type": body ? "application/json" : "",
            authorization: `Bearer ${tkn}`
        },
        credentials: 'include',
        body: JSON.stringify(body),
    };
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}/${route}`, config_fetch)
    if ([403, 401].includes(resp.code)) {
        throw new Error('Error de permisos')
    }
    return resp
}
