

export const interfaceDatabaseName  = { // pattern in which toplevel object key is the database name to insert the data to.
    get webappSetting() {
        let tablePrefix = 'shellscript_'

        /**
         * {Array of Objects}
         */
        let databaseData = [
            require('./unit.js').default,
            require('./nestedUnit.js').default,
        ].map(object => { // add prefix to databaseTableName in each object data.
            object.databaseTableName = tablePrefix.concat(object.databaseTableName)
            return object
        })

        return databaseData
    }, 
}