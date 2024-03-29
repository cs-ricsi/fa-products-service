import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import productsModel from '../model/product'
import stocksModel from '../model/stock'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log(req);

    try {
        const products = await productsModel.list();
        
        const productsWithStock = [];

        for (const product of products) {
            const stock = await stocksModel.readByProductId(product.id);
            productsWithStock.push({
              id: product.id,
              title: product.title,
              description: product.description,
              price: product.price,
              count: stock.count || 'N/A',
            });
          }

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: productsWithStock
        };

    } catch (error) {
        context.log(error);
        context.res = {
            status: 500,
            body: "Internal Server Error",
        };
    }

};

export default httpTrigger;