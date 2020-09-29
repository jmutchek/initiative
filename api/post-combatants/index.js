module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function: post-combatants');
    req

    // const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    const rowkey = (req.query.rowkey || (req.body && req.body.RowKey));
    const visible = (req.query.visible || (req.body && req.body.visible));

    context.bindings.combatant = [];
    context.bindings.combatant.push(
      {
        PartitionKey: "001",
        RowKey: rowkey,
        visible: visible
      }
    );

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { "status": "OK"}
    };

    // context.done();
}