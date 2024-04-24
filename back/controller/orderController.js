const db = require('../database/models'); // Asumiendo que usas Sequelize y tienes tus modelos configurados

const orderController = {
    createOrder: async (req, res) => {
        try {
            const order = await db.Pedido.create(req.body);
            res.status(201).send(order);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    getUserOrders: async (req, res) => {
        try {
            const orders = await db.Pedido.findAll({
                where: { id_usuario: req.params.userId }
            });
            res.send(orders);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    getOrderById: async (req, res) => {
        try {
            const order = await db.Pedido.findByPk(req.params.id);
            if (order) {
                res.send(order);
            } else {
                res.status(404).send({ message: 'Order not found' });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = orderController;
