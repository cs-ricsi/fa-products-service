import { CosmosClient } from "@azure/cosmos";

const key = process.env.COSMOS_KEY || '';
const endpoint = process.env.COSMOS_ENDPOINT || '';

const cosmosClient = new CosmosClient({ endpoint, key });

const database = cosmosClient.database(`products-db`);
const container = database.container(`stocks`);

export const list = async () => {
    const { resources } = await container.items.readAll().fetchAll();
    return resources;
};

export const read = async (id) => {
    const { resources } = await container.items.query(`SELECT * FROM c WHERE c.id = "${id}"`).fetchAll();
    return resources[0];
};

export const readByProductId = async (id) => {
    const { resources } = await container.items.query(`SELECT * FROM c WHERE c.product_id = "${id}"`).fetchAll();
    return resources[0];
};

export const create = async (stock) => {
    const { resource } = await container.items.upsert(stock);
    return resource;
};

export default {
    create,
    read,
    readByProductId,
    list,
};