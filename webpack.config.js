module.exports = function (webpackEnv) {
    // ...
    return {
        // ...
        resolve: {
            // ...
            fallback: {
                // 👇️👇️👇️ add this 👇️👇️👇️
                timers: require.resolve('timers-browserify'),
            },
        },
    };
};
