import { Router } from "express";
import { userController } from "../controllers/user.controllers";
import { verifyToken } from "../middlewares/jwt.middleware";

const router: Router = Router();

// path: /api/v1/users

// leer usuarios
router.get("/", verifyToken, userController.getUsers);

// leer unico usuario
router.get("/:id", userController.getUser);

// crear un usuario: POST /api/v1/users 201
router.post("/", userController.createUser);

// eliminar un usuario por id: DELETE /api/v1/users/:id 204
router.delete("/:id", userController.deleteUser);

// actualizar un usuario por id: PUT /api/v1/users/:id 200
router.put("/:id", userController.updateUser);


export default router;