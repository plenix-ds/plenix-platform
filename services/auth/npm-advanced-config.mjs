// batch 258: the advanced config of the Plenix proxy hosts (27 plenix, 28 design-system); used by npm-plenix.mjs (apply) and npm-dryrun.mjs (test first)
// AUTHENTIK_OUTPOST: the Authentik outpost's address on the private network (scheme, host and port, for example
// http://<host>:<port>), from the environment. There is no default: the config is not built without it.
const OUTPOST_URL = process.env.AUTHENTIK_OUTPOST;
if (!OUTPOST_URL) throw new Error('Missing AUTHENTIK_OUTPOST: set it in the environment (the Authentik outpost, http://<host>:<port>).');
const OUTPOST = `
location /outpost.goauthentik.io {
    proxy_pass              ${OUTPOST_URL.replace(/\/+$/, '')}/outpost.goauthentik.io;
    proxy_set_header        Host $host;
    proxy_set_header        X-Original-URL $scheme://$http_host$request_uri;
    add_header              Set-Cookie $auth_cookie;
    auth_request_set        $auth_cookie $upstream_http_set_cookie;
    proxy_pass_request_body off;
    proxy_set_header        Content-Length "";
}

# signed out: no Set-Cookie here. The check's 401 carries a fresh, empty outpost session; passing it on let any other
# request (the site icon, a script) replace the cookie that holds the sign-in's state, and the callback failed with 400
# ("mismatched session ID", batch 262). Only /outpost.goauthentik.io/start sets the session cookie.
location @goauthentik_proxy_signin {
    internal;
    return 302 /outpost.goauthentik.io/start?rd=$scheme://$http_host$request_uri;
}
`;
// the check, and the signed-in person passed on (overwriting whatever a visitor sent in these headers)
const CHECK = (onSignedOut) => `
    auth_request     /outpost.goauthentik.io/auth/nginx;
    error_page       401 = ${onSignedOut};
    auth_request_set $auth_cookie $upstream_http_set_cookie;
    add_header       Set-Cookie $auth_cookie;
    auth_request_set $authentik_username $upstream_http_x_authentik_username;
    auth_request_set $authentik_groups $upstream_http_x_authentik_groups;
    auth_request_set $authentik_email $upstream_http_x_authentik_email;
    proxy_set_header X-authentik-username $authentik_username;
    proxy_set_header X-authentik-groups $authentik_groups;
    proxy_set_header X-authentik-email $authentik_email;
`;
const UPSTREAM = `
    include conf.d/include/proxy.conf;
`;

export const A27 = `# Plenix: every app signs in through Authentik (batch 258; application "plenix": Admins, Editors, Users)
port_in_redirect off;

location / {${CHECK('@goauthentik_proxy_signin')}${UPSTREAM}}
${OUTPOST}`;

export const A28 = `# Plenix design system: public; Save and the session sign in through Authentik (batch 258; application
# "plenix-design-system": Admins, Editors). The CDN and the API stay open to every site.
port_in_redirect off;

location = /api/tokens {${CHECK('@plx_signed_out')}    client_max_body_size 64k;
    proxy_read_timeout 300s;${UPSTREAM}}

location = /api/session {${CHECK('@plx_signed_out')}${UPSTREAM}}

# sign in, then back to the page (rd: a path on this site only). A return here would run before the check (nginx's
# rewrite phase comes before access), so the redirect waits in a named location that try_files reaches after it.
location = /api/signin {${CHECK('@goauthentik_proxy_signin')}    try_files /.plx-none @plx_back;
}

location @plx_back {
    set $plx_back /Plenix/platform/design-system/;
    if ($arg_rd ~ "^/[A-Za-z0-9]") { set $plx_back $arg_rd; }
    return 302 $plx_back;
}

location @plx_signed_out {
    internal;
    default_type application/json;
    return 401 '{"error":"signed-out","message":"Sign in to save.","signin":"/api/signin"}';
}
${OUTPOST}`;

