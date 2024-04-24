const db = require('../database/models'); // Asumiendo que usas Sequelize y tienes tus modelos configurados

const userController = {
    register: async (req, res) => {
        try {
            const user = await db.Usuario.create(req.body);
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    login: async (req, res) => {
        try {
            const user = await db.Usuario.findOne({ where: { email: req.body.email } });
            if (!user || !(await user.validPassword(req.body.contrasena))) {
                return res.status(401).send({ message: 'Authentication failed' });
            }
            res.send({ message: 'Login successful', user });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    profile: async (req, res) => {
        try {
            const user = await db.Usuario.findByPk(req.user.id);
            res.send(user);
        } catch (error) {
            res.status(404).send(error);
        }
    },

    updateUser: async (req, res) => {
        try {
            const user = await db.Usuario.findByPk(req.params.id);
            if (user) {
                await user.update(req.body);
                res.send({ message: 'User updated', user });
            } else {
                res.status(404).send({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = userController;
