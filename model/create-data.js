import productsModel from './product'
import stocksModel from './stock'

productsModel.create({ title: 'ProductOne', description: 'Short Product Description1', price: 10 })
    .then(res => {
        stocksModel.create({ product_id: res.id, count: 8 });
    });

productsModel.create({ title: 'ProductTwo', description: 'Short Product Description2', price: 20 })
    .then(res => {
        stocksModel.create({ product_id: res.id, count: 5 });
    });;

productsModel.create({ title: 'ProductThree', description: 'Short Product Description3', price: 30 })
    .then(res => {
        stocksModel.create({ product_id: res.id, count: 7 });
    });;
