import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/generateToken.ts";
import cache from "../utils/cache.ts";
import dayjs from "dayjs";
import { User } from "../models/user.ts";
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        // const user = await User.findOne({ email });
        // if (!user) {
        //     return res.status(401).json({
        //         message: "Usuario Incorrectas" });
        // }
        // //const validPassword = await bcrypt.compare(password, user.password);
        // if (password !== user.password) {
        //         return res.status(401).json({ message: "Credenciales Incorrectas" });
        //     }
        if (email !== 'alice@example.com' || password !== '123456') {
            return res.status(401).json({ message: "Credenciales Incorrectas" });
        }
        const userId = "123456";
        //const accessToken = generateAccessToken(user.id);
        const accessToken = generateAccessToken(userId);
        cache.set(userId, accessToken, 60 * 15);
        return res.json({ accessToken });
    }
    catch (error) {
        console.error("Error en login:", error);
        return res.status(501).json({ message: "Error interno del servidor" });
    }
};
export const getTimeToken = (req, res) => {
    const { userId } = req.params;
    const ttl = cache.getTtl(userId);
    if (!ttl) {
        return res.status(404)
            .json({ message: "Token no encontrado" });
    }
    const now = Date.now();
    const timetolife = Math.floor((ttl - now) / 1000);
    const expTime = dayjs(ttl).format('HH:mm:ss');
    return res.json({ timetolife, expTime });
};
export const updateToken = (req, res) => {
    const { userId } = req.params;
    const ttl = cache.getTtl(userId);
    if (!ttl) {
        return res.status(404)
            .json({ message: "Token no encontrado" });
    }
    const newTimeTtl = 60 * 15;
    cache.ttl(userId, newTimeTtl);
    return res.status(200).json({ message: "Actualizacion con exito" });
};
//CONSULTAR TODOS LOS USUARIOS
export const getAllUsers = async (req, res) => {
    const { UserEmail } = req.query;
    const userList = await User.find(); //FIND, sirve para encontrar todos los registros
    const userByEmail = await User.find({ email: UserEmail });
    console.log(userByEmail);
    return res.json({ userList });
};
//AGREGAR NUEVO USUARIO
export const saveUser = async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body;
        if (!password) {
            return res.status(400).json({ message: "La contraseña es obligatoria" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            phone,
            createDate: Date.now(),
            status: true
        });
        const user = await newUser.save();
        return res.json({ user });
    }
    catch (error) {
        console.log("Error en saveUser: ", error);
        return res.status(426).json({ error });
    }
};
//ACTUALIZAR UN USUARIO
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, password, role, phone } = req.body;
        // 1) Validar ID
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "ID de usuario inválido" });
        }
        // 2) Construir objeto de campos a actualizar
        const updates = {};
        if (name) {
            updates.name = name;
        }
        if (role) {
            updates.role = role;
        }
        if (phone) {
            updates.phone = phone;
        }
        if (password) {
            // si cambian la contraseña, la hasheamos
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(password, salt);
        }
        // 3) Aplicar actualización
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true, context: "query" }).select("-password"); // opcional: no devolver el hash
        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        // 4) Responder con el usuario actualizado
        return res.json({ user: updatedUser });
    }
    catch (error) {
        console.error("error en updateUser:", error);
        return res.status(500).json({ error: "Error al actualizar usuario" });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndUpdate(id, {
            status: false,
            deleteDate: new Date()
        }, { new: true });
        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        return res.json({ message: 'Usuario desactivado', deletedUser });
    }
    catch (error) {
        console.log("Error en deleteUser: ", error);
        return res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};
