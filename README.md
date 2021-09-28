# vite-define-envs-plugin
Embed environment variables as global constants for local js files.

## how it works
`vite-define-envs-plugin` will read from `process.env` and define specific environment variables as global constants.

[read more about process.env](https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_env)

## arguments
- `keys` - array of keys to read from `process.env`.
- `scope` - scope of the global constants. Default to "process.env" if not set.

## how to use
```js
// vite.config.js

import viteDefineEnvs from "vite-define-envs-plugin";

export default {
    plugins: [
        new viteDefineEnvs(["USER", "API_BASE_URL"], "GLOBAL")
    ]
};


// your .js file

const appEnv = GLOBAL.USER;
const apiUrl = GLOBAL.API_BASE_URL;
```

## avoid using process.env scope
It's not recommended to use `process.env` scope since it's not the same `process.env` that `Node` uses.

Local js files don't know about `process.env`, so the environment variables have to be processed and embedded by `vite` during the build time. On the other hand, in a `Node` application, `process.env` is a `Node` module and is injected at runtime.
