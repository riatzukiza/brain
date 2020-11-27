module.exports = {
    apps:[
        {
            name : "app",
            script : "ts-node ./src/index.ts",
            watch: ['src'],
            watch_delay: 1000,
            ignore_watch : ["node_modules"],
            watch_options:{ followSymlinks: false }
        }
    ]
}
