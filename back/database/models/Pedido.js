module.exports = (sequelize, DataTypes) => {
    const alias = 'Pedido';
    const cols = {
        id_pedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha_pedido: {
            type: DataTypes.DATE,
            allowNull: false
        },
        estado: {
            type: DataTypes.STRING,
            defaultValue: 'Pendiente'
        }
    };
    const config = {
        tableName: 'Pedidos',
        timestamps: false
    };

    const Pedido = sequelize.define(alias, cols, config);

    Pedido.associate = function(models) {
        Pedido.belongsTo(models.Usuario, {
            foreignKey: 'id_usuario',
            as: 'usuario'
        });
        Pedido.hasMany(models.DetallePedido, {
            foreignKey: 'id_pedido',
            as: 'detallesPedido'
        });
    };

    return Pedido;
};
