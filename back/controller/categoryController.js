const db = require('../database/models'); // Asumiendo que usas Sequelize y tienes tus modelos configurados

const categoryController = {
    getAllCategories: async (req, res) => {
        try {
            const categories = await db.Categoria.findAll();
            res.send(categories);
        } catch (error) {
            res.status(500).send(error);
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
