import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import productsModel from '../model/product'
import stocksModel from '../model/stock'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log(req);

    try {
        const product = await productsModel.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price

        });
        const stock = await stocksModel.create({
            product_id: product.id,
            count: req.body.count
        });
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: {
                product: product,
                stock: stock
            }
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