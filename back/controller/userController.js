const db = require('../database/models'); 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {
    // Crear un nuevo usuario
    createUser: async (req, res) => {
        try {
            const { nombre, email, direccion, telefono, rol } = req.body;
            const hashedPassword = await bcrypt.hash(req.body.contrasena, saltRounds);

            const newUser = await db.Usuario.create({
                nombre,
                email,
                contrasena: hashedPassword,
                direccion,
                telefono,
                rol
            });

            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    login: async (req, res) => {

        console.log(req.body)

        const { email, contrasena } = req.body;
        // Aquí deberías verificar las credenciales del usuario con la base de datos
        const user = await db.Usuario.findOne({ where: { email: email } });
        if (user && bcrypt.compareSync(contrasena, user.contrasena)) {
            // Usuario autenticado
            const token = jwt.sign(
                { id: user.id_usuario, email: user.email, rol: user.rol },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            res.json({ success: true, token: token });
        } else {
            res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
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


