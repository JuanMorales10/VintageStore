module.exports = (sequelize, DataTypes) => {
    const alias = 'DetallePedido';
    const cols = {
        id_pedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        id_producto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio_por_unidad: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    };
    const config = {
        tableName: 'DetallesPedido',
        timestamps: false
    };

    const DetallePedido = sequelize.define(alias, cols, config);

    DetallePedido.associate = function(models) {
        DetallePedido.belongsTo(models.Pedido, {
            foreignKey: 'id_pedido',
            as: 'pedido'
        });
        DetallePedido.belongsTo(models.Producto, {
            foreignKey: 'id_producto',
            as: 'producto'
        });
    };

    return DetallePedido;
};
