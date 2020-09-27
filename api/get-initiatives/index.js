module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    req
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
          data: context.bindings.initiativeList
        }
    };
}
