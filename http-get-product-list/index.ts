import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Product } from "../model/product"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const products: Product[] = [
        { id: '1', title: 'ProductOne', description: 'Short Product Description1', price: '10' },
        { id: '2', title: 'ProductTwo', description: 'Short Product Description2', price: '20' }
    ];

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: products
    };

};

export default httpTrigger;