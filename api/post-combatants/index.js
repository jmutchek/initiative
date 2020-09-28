module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function: post-combatants');
    req

    // const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    const rowkey = (req.query.rowkey || (req.body && req.body.RowKey));

    context.bindings.combatant = [];
    context.bindings.combatant.push(
      {
        PartitionKey: "001",
        RowKey: rowkey,
        visible: false
      }
    );

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { "status": "OK"}
    };

    // context.done();
}