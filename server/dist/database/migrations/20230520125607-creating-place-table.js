'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('places', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            description: {
                allowNull: false,
                unique: {
                    name: 'unique_description',
                    length: 255,
                },
                type: Sequelize.TEXT,
            },
            image: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            address: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            location: {
                allowNull: false,
                type: Sequelize.ENUM('LAT', 'LNG'),
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('places');
    },
};
//# sourceMappingURL=20230520125607-creating-place-table.js.map