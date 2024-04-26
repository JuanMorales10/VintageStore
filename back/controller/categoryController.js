const db = require('../database/models'); // Asumiendo que usas Sequelize y tienes tus modelos configurados

const categoryController = {
  getAllCategorias: async (req, res) => {
    try {
      // Obtenemos solo las categorías que no tienen una 'categoriaPadreId'
      const categorias = await db.Categoria.findAll({
        where: {
          categoriaPadreId: null // Suponiendo que 'null' indica categorías principales
        }
      });
      res.json(categorias);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

    createCategory: async (req, res) => {
        try {
            const category = await db.Categoria.create(req.body);
            res.status(201).send(category);
        } catch (error) {
            res.status(400).send(error);
        }
    }
};

module.exports = categoryController;
