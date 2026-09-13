import { createUserSchema, updateUserSchema } from "../schemas/users.schema.js";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/users.service.js";
import { parseId } from "../utils/parseId.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createUserController = asyncHandler(async (req, res) => {
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request data",
      errors: result.error.flatten(),
    });
  }

  const user = await createUser(result.data);

  return res.status(201).json({
    message: "User created successfully",
    user,
  });
});

export const getUsersController = asyncHandler(async (_req, res) => {
  const users = await getUsers();

  return res.json({
    users,
  });
});

export const getUserByIdController = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      message: "Invalid user ID",
    });
  }

  const user = await getUserById(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.json({
    user,
  });
});

export const updateUserController = asyncHandler(async (req, res) => {
  const result = updateUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request data",
      errors: result.error.flatten(),
    });
  }

  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      message: "Invalid user ID",
    });
  }

  const user = await updateUser(id, result.data);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.json({
    message: "User updated successfully",
    user,
  });
});

export const deleteUserController = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      message: "Invalid user ID",
    });
  }

  const user = await deleteUser(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.json({
    message: "User deleted successfully",
  });
});
