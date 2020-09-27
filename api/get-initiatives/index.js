module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function: get-initiatives');
    req
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
          data: context.bindings.initiativeList
        }
    };
}
