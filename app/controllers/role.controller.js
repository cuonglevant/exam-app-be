import db from "../models/index.js";

const Role = db.role;

export const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if role with this name already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res
        .status(400)
        .json({ message: "Role with this name already exists" });
    }

    const newRole = new Role({
      name,
    });

    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoleByName = async (req, res) => {
  try {
    const role = await Role.findOne({ name: req.params.name });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if another role with this name exists
    if (name) {
      const existingRole = await Role.findOne({
        name,
        _id: { $ne: req.params.id },
      });
      if (existingRole) {
        return res
          .status(400)
          .json({ message: "Role with this name already exists" });
      }
    }

    const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const initializeDefaultRoles = async (req, res) => {
  try {
    const defaultRoles = ["user", "admin", "moderator"];
    const createdRoles = [];

    for (const roleName of defaultRoles) {
      const existingRole = await Role.findOne({ name: roleName });
      if (!existingRole) {
        const newRole = new Role({ name: roleName });
        const savedRole = await newRole.save();
        createdRoles.push(savedRole);
      }
    }

    res.status(200).json({
      message: "Default roles initialized successfully",
      createdRoles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createRole,
  getRoles,
  getRoleById,
  getRoleByName,
  updateRole,
  deleteRole,
  initializeDefaultRoles,
};
