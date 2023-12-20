import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Product } from "../model/product"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const product: Product = {
        id: req.params.productId, title: 'ProductOne', description: 'Short Product Description1', price: '10'
    };

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: product
    };

};

export default httpTrigger;