const db = require('../database/models'); // Asumiendo que usas Sequelize y tienes tus modelos configurados

const categoryController = {
  getAllCategorias: async (req, res) => {
    try {
      const categorias = await db.Categoria.findAll({
        where: { categoriaPadreId: null }
      });
      res.json(categorias);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  getSubcategorias: async (req, res) => {
    const { id_categoria } = req.params;
    try {
      const subcategorias = await db.Categoria.findAll({
        where: { categoriaPadreId: id_categoria }
      });
      if (subcategorias.length > 0) {
        res.status(200).json(subcategorias);
      } else {
        res.status(404).json({ message: 'No subcategories found' });
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      res.status(500).json({ error: 'Internal server error' });
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
