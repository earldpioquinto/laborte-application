const { app } = require('@azure/functions');
const { CosmosClient } = require("@azure/cosmos");
require('dotenv').config();


app.http('dbCosmosUpdate', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
        context.log(request.body);
        
        const endpoint = process.env.COSMOS_ENDPOINT;
        const key = process.env.COSMOS_KEY;
        const databaseId = process.env.DATABASE_ID;
        const containerId = process.env.CONTAINER_ID;

        const client = new CosmosClient({ endpoint, key });
        const database = client.database(databaseId);
        const container = database.container(containerId);

        const rawBody = await request.text();
        const body = rawBody ? JSON.parse(rawBody) : {};

        const items = body.items;
        const promises = [];
        const responses = [];

        if (items) {
            items.forEach(data => {
                promises.push(container.items.upsert(data));
            });
        }
        await Promise.allSettled(promises).then((results) =>
            results.forEach((result, index) => {
                responses.push({"index": index, "status": result.status});
            })
        );
        return { body: JSON.stringify(responses) };
    }
});
