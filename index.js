/**
 * this plugin takes array of keys, stringify each of the
 * `process.env.<key>` values, then define the global constants.
 *
 * @param {Array} keys - keys to be defined from process.env scope.
 * @param {String} scope - scope of the global constants. Default to "process.env".
 */
module.exports = function viteDefineEnvs(keys, scope = "process.env") {
    if (!Array.isArray(keys)) {
        throw new Error("'keys' parameter must be an array.");
    }

    const envs = keys.reduce((acc, cur) => {
        const value = process.env[cur];
        acc[`${scope}.${cur}`] = value === undefined ? "undefined" : JSON.stringify(value);

        return acc;
    }, {});

    return {
        name: "vite-define-envs",
        config: (config) => ({
            define: {
                ...envs,
                ...config.define,
            },
        }),
    };
}
