module.exports = (sequelize, DataTypes) => {
    const alias = 'Producto';
    const cols = {
        id_producto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        id_categoria: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_subcategoria: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Categoria',
                key: 'id_categoria'
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        talla: {
            type: DataTypes.STRING
        }
    };
    const config = {
        tableName: 'Productos',
        timestamps: false
    };

    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models) {
        Producto.belongsTo(models.Categoria, {
            foreignKey: 'id_categoria',
            as: 'categoria'
        });
        Producto.belongsTo(models.Categoria, {
            foreignKey: 'id_subcategoria',
            as: 'subcategoria'
        });
        Producto.hasMany(models.ProductImage, {
            foreignKey: 'productId',
            as: 'imagenes',
            onDelete: 'CASCADE' // Asegura que al eliminar un producto, sus imágenes se eliminen automáticamente
        });
    };

    return Producto;
};
