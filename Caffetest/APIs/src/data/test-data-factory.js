const faker = require('faker');

class TestDataFactory {
  static generateUser(payload = {}) {
    return {
      name: payload.name || faker.name.findName(),
      email: payload.email || faker.internet.email(),
      password: payload.password || faker.internet.password(12),
      ...payload
    };
  }

  static generateProduct(payload = {}) {
    return {
      name: payload.name || faker.commerce.productName(),
      price: payload.price || faker.commerce.price(10, 1000),
      description: payload.description || faker.commerce.productDescription(),
      ...payload
    };
  }

  static generateOrder(payload = {}) {
    return {
      items: payload.items || [{
        productId: faker.datatype.uuid(),
        quantity: faker.datatype.number({ min: 1, max: 10 })
      }],
      shippingAddress: payload.shippingAddress || {
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        zipCode: faker.address.zipCode()
      },
      ...payload
    };
  }
}

module.exports = TestDataFactory;