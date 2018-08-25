console.log(`\x1b[33m\x1b[1m\x1b[7m\x1b[36m%s\x1b[0m \x1b[2m\x1b[3m%s\x1b[0m`, `Container:`, `NodeJS App`)

/* Entrypoint chain */
;(async ()=>{ 
    // Transpilation - babelJSCompiler
    require('@dependency/javascriptTranspilation')({ babelConfigurationFile: 'serverRuntime.BabelConfig.js' })
    // Setup environment 
    await require('../setup/script/appRuntimeScript/runtimeSetupEnvironment.js').setupEnvironment()
    // Run
    require('./app.js')
})().catch(error => console.error(error)) // async wrapper