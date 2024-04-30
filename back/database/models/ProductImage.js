// models/ProductImage.js
module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('ProductImage', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Productos', // Nombre de la tabla de productos
                key: 'id_producto'
            }
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'ProductImages',
        timestamps: false
    });
    

    return ProductImage;
};
