const azure = require('azure-storage');

const tableService = azure.createTableService();
const tableName = "initiative";

module.exports = function (context, req) {
  context.log('JavaScript HTTP trigger function: put-combatants');

  // const name = (req.query.name || (req.body && req.body.name));
  // const responseMessage = name
  //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
  //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

  if (req.body) {

    // TODO: Add some object validation logic
    const item = req.body;

    tableService.replaceEntity(tableName, item, function (error, result, response) {
      response;
      if (!error) {
        context.res.status(202).json(result);
      } else {
        context.res.status(500).json({ error: error });
      }
    });
  }
  else {
    context.res = {
      status: 400,
      body: "Please pass an item in the request body"
    };
    context.done();
  }
}