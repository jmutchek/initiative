const azure = require('azure-storage');

const tableService = azure.createTableService();
const tableName = "initiative";

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function: delete-combatants');

  if (req.body) {

    // TODO: Add some object validation logic
    const item = req.body;

    tableService.deleteEntity(tableName, item, function (error, result, response) {
      if (!error) {
        context.res = {
          status: 204,
          headers: { 'Content-Type':'application/json' },
          body: response
        }
      }
      else {
        context.res = {
          status: 500,
          headers: { 'Content-Type':'application/json' },
          body: { 
            "status": "error",
            "message": error.message
          }
        }
      }
    });
  }
  else {
    context.res = {
      status: 404,
      headers: { 'Content-Type':'application/json' },
      body: { 
        "status": "Not Found"
      }
    };
  }

}