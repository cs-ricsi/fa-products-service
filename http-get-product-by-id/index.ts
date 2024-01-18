import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import productsModel from '../model/product'
import sctocksModel from '../model/stock'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log(req);

    const product = await productsModel.read(req.params.productId);

    const stock = await sctocksModel.readByProductId(product.id);
    product.count = stock.count;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: product
    };

};

export default httpTrigger;