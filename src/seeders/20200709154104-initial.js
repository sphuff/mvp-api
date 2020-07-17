'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [{
     stripeCustomerId: 'customerId',
     stripeSubscriptionId: 'subId',
     email: 'test@email.com',
     createdAt: new Date(),
     updatedAt: new Date(),
   }]);
   await queryInterface.bulkInsert('ApiKeys', [{
     publicKey: 'public',
     privateKey: 'private',
     'UserId': 1,
     createdAt: new Date(),
     updatedAt: new Date(),
   }]);
   await queryInterface.bulkInsert('LoginTokens', [{
     token: 'abcdef',
     'UserId': 1,
     createdAt: new Date(),
     updatedAt: new Date(),
   }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('LoginTokens', null, {});
    await queryInterface.bulkDelete('ApiKeys', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
