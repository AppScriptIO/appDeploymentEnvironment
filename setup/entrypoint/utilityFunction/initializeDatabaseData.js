import { createDatabase, createTableAndInsertData } from "appscript/utilityFunction/database/initializeDatabase.query.js";
import rethinkDB from 'rethinkdb'

function initializeDatabaseData({databaseData, connection}) {
    return createDatabase('webappSetting', connection, rethinkDB)
        .then(async () => {
            await createTableAndInsertData('webappSetting', databaseData.webappSetting, connection, rethinkDB)
        })
        .catch(error=> { throw error })
}

export default initializeDatabaseData