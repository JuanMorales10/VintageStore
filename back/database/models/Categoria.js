module.exports = (sequelize, DataTypes) => {
    const alias = 'Categoria';
    const cols = {
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
        }
    };
    const config = {
        tableName: 'Categorias',
        timestamps: false
    };

    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = function(models) {
        Categoria.hasMany(models.Producto, {
            foreignKey: 'id_categoria',
            as: 'productos'
        });
    };

    return Categoria;
};
