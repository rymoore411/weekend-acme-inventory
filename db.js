const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_inventory_db');

const Product = conn.define('product', {
  product: Sequelize.STRING
})

const Inventory = conn.define('status', {
  status: Sequelize.STRING
})

Product.belongsTo(Inventory);
Inventory.hasMany(Product);

const syncAndSeed = async() => {
  await conn.sync({force: true});
  const products = ['foo', 'bar', 'bazz', 'qug'];
  const [foo, bar, bazz, qug] = await Promise.all(products.map( product => Product.create ({product})));
  const inventory = ['INSTOCK', 'BACKORDERED', 'DISCONTINUED'];
  const [INSTOCK, BACKORDERED, DISCONTINUED] = await Promise.all(inventory.map(status => Inventory.create ({status})));

  foo.statusId = INSTOCK.id;
  bar.statusId = BACKORDERED.id;
  bazz.statusId = DISCONTINUED.id;
  qug.statusId = INSTOCK.id;
  await Promise.all([foo.save(), bar.save(), bazz.save(), qug.save()]);

};


module.exports = {
  models: {
    Product,
    Inventory
  },
  syncAndSeed
};
