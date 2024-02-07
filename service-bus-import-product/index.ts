import { AzureFunction, Context } from "@azure/functions"
import productsModel from '../model/product'
import stocksModel from '../model/stock'

const serviceBusQueueTrigger: AzureFunction = async function (context: Context, mySbMsg: any): Promise<void> {
    context.log('ServiceBus queue trigger function processed message', mySbMsg);
    context.log(context);
    const parsedMsg = JSON.parse(mySbMsg);

    try {
        const product = await productsModel.create({
            title: parsedMsg.title,
            description: parsedMsg.description,
            price: parsedMsg.price
        });
        const stock = await stocksModel.create({
            product_id: product.id,
            count: parsedMsg.count
        });

    } catch (error) {
        context.log(error);
    }
};

export default serviceBusQueueTrigger;
