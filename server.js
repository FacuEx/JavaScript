const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { body, validationResult } = require("express-validator"); // Importar express-validator

const app = express();
const PORT = 3000;
const USERS_FILE = "users.json"; // Archivo donde guardaremos los usuarios

app.use(express.json());
app.use(cors()); // Permitir solicitudes desde el frontend

// Función para leer usuarios desde el archivo JSON
const leerUsuarios = () => {
    try {
        return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
    } catch (error) {
        return []; // Si el archivo no existe, devolver un array vacío
    }
};

// Función para guardar usuarios en el archivo JSON
const guardarUsuarios = (usuarios) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(usuarios, null, 2));
};

// Ruta de Registro
app.post("/register", (req, res) => {
    const { nombreCompleto, usuario, password, email, phone } = req.body;

    // Validación de datos
    if (!nombreCompleto || !usuario || !password || !email || !phone) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    let usuarios = leerUsuarios();

    // Verificar si el usuario ya existe
    if (usuarios.find(user => user.email === email)) {
        return res.status(400).json({ message: "El email ya está registrado." });
    }

    // Guardar nuevo usuario
    const nuevoUsuario = { nombreCompleto, usuario, password, email, phone };
    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);

    res.status(201).json({ message: "Usuario registrado con éxito" });
});

//Ruta de Login
app.post('/login', [
    body('usuario').notEmpty().withMessage('El usuario es obligatorio'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { usuario, password } = req.body;
    let usuarios = leerUsuarios();

    // Buscar el usuario en la "base de datos"
    const usuarioEncontrado = usuarios.find(user => user.usuario.trim().toLowerCase() === usuario.trim().toLowerCase());

    if (!usuarioEncontrado) {
        return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Comparar contraseñas
    if (usuarioEncontrado.password !== password) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.json({ message: "Login exitoso", success: true });
});

//Iniciar el servidor después de registrar todas las rutas
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

let codigosRecuperacion = {};

app.post("/recuperar", (req, res) => {
    const { email } = req.body;
    let usuarios = leerUsuarios();
    const usuarioEncontrado = usuarios.find(user => user.email === email);

    if (!usuarioEncontrado) {
        return res.status(404).json({ message: "No se encontró una cuenta con ese email." });
    }

    // Generar un código de recuperación aleatorio
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    codigosRecuperacion[email] = codigo; // Guardamos el código temporalmente

    console.log(`Código de recuperación para ${email}: ${codigo}`);
    res.json({ message: "Se ha enviado un código de recuperación a tu email." });
});

// Ruta para restablecer la contraseña
app.post("/resetpass", (req, res) => {
    const { email, codigo, newPassword } = req.body;
    let usuarios = leerUsuarios();

    const usuario = usuarios.find(user => user.email === email);
    if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Verificar el código de recuperación
    if (codigosRecuperacion[email] !== codigo) {
        return res.status(400).json({ message: "Código de recuperación incorrecto." });
    }

    // Actualizar la contraseña
    usuario.password = newPassword;
    guardarUsuarios(usuarios);

    // Eliminar el código de recuperación para mayor seguridad
    delete codigosRecuperacion[email];

    res.json({ message: "Contraseña restablecida con éxito." });
});