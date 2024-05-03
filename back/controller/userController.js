const db = require('../database/models'); // Asegúrate de que la ruta a tus modelos es correcta

const userController = {
    // Crear un nuevo usuario
    createUser: async (req, res) => {
        try {
            const { nombre, email, contrasena, direccion, telefono, rol } = req.body;
            const newUser = await db.Usuario.create({
                nombre,
                email,
                contrasena,
                direccion,
                telefono,
                rol
            });
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Obtener todos los usuarios
    getAllUsers: async (req, res) => {
        try {
            const users = await db.Usuario.findAll();
            res.json(users);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Obtener un usuario por ID
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await db.Usuario.findByPk(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Actualizar un usuario
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, email, contrasena, direccion, telefono, rol } = req.body;
            const user = await db.Usuario.findByPk(id);
            if (user) {
                await user.update({
                    nombre,
                    email,
                    contrasena,
                    direccion,
                    telefono,
                    rol
                });
                res.json({ message: 'Usuario actualizado', user });
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    // Eliminar un usuario
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await db.Usuario.findByPk(id);
            if (user) {
                await user.destroy();
                res.json({ message: 'Usuario eliminado' });
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

module.exports = userController;

module.exports = userController;
