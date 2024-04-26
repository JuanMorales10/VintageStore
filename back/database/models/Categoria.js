module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {
        id_categoria: {
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
        categoriaPadreId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Categorias',
                key: 'id_categoria'
            }
        },
    }, {
        tableName: 'Categorias',
        timestamps: false
    });

    Categoria.associate = function(models) {
        // Relación consigo misma para manejar subcategorías
        Categoria.hasMany(models.Categoria, {
            foreignKey: 'categoriaPadreId',
            as: 'subcategorias'
        });

        // Relación con productos
        Categoria.hasMany(models.Producto, {
            foreignKey: 'id_categoria',
            as: 'productos'
        });
    };

    return Categoria;
};
