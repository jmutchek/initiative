const azure = require('azure-storage');

const tableService = azure.createTableService();
const tableName = "initiative";

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function: delete-combatants');

  if (req.body) {

    // TODO: Add some object validation logic
    const item = req.body;

    var deleteTableResult = await (deleteCombatant(context, tableService, tableName, item));

    if (!deleteTableResult.error) {
      context.res = {
        status: 202, /* Defaults to 200 */
        body: { "status": "OK" }
      };
    }
    
  }
  else {
    context.res.status(404).send();
  }
}

function deleteCombatant(context, tableService, tableName, item) {
  return new Promise((resolve, reject) => {
    tableService.deleteEntity(tableName, item, function (error, result, response) {
      response;
      if (!error) {
        resolve(result)
        // context.res.status(202).json(result);
      } else {
        reject(error)
        // context.res.status(500).json({ error: error });
      }
    });
  })
}