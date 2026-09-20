import { jest } from "@jest/globals";

const mockUser = {
  id: 1,
  name: "Muhammad Riaz",
  email: "riaz@example.com",
  created_at: new Date(),
};

const mockQuery =
  jest.fn<(query: string, values?: unknown[]) => Promise<{ rows: any[] }>>();

jest.unstable_mockModule("../../config/database.js", () => ({
  pool: {
    query: mockQuery,
  },
}));

const { getUserById, createUser, updateUser, deleteUser } =
  await import("../users.service.js");

describe("getUserById", () => {
  beforeEach(() => {
    mockQuery.mockReset();
  });
  it("should return a user by id", async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [mockUser],
    });

    const result = await getUserById(1);

    expect(mockQuery).toHaveBeenCalledWith(
      `
      SELECT id, name, email, created_at
      FROM users
      WHERE id = $1;
    `,
      [1],
    );

    expect(result).toEqual(mockUser);
  });

  it("should return undefined when the user does not exist", async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [],
    });

    const result = await getUserById(999);

    expect(result).toBeUndefined();
  });
});
describe("createUser", () => {
  beforeEach(() => {
    mockQuery.mockReset();
  });
  it("should create a user", async () => {
    const input = {
      name: "Ali Khan",
      email: "ali@example.com",
      password: "password123",
    };

    const createdUser = {
      id: 2,
      name: input.name,
      email: input.email,
      created_at: new Date(),
    };

    mockQuery.mockResolvedValueOnce({
      rows: [createdUser],
    });

    const result = await createUser(input);

    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO users (name, email, password_hash)"),
      [input.name, input.email, expect.any(String)],
    );

    expect(result).toEqual(createdUser);
  });
  it("should throw an error when email already exists", async () => {
    const input = {
      name: "Ali Khan",
      email: "riaz@example.com",
      password: "password123",
    };

    const databaseError = Object.assign(
      new Error("duplicate key value violates unique constraint"),
      {
        code: "23505",
      },
    );

    mockQuery.mockRejectedValueOnce(databaseError);

    await expect(createUser(input)).rejects.toMatchObject({
      message: "Email already exists",
      statusCode: 409,
    });
  });
});

describe("updateUser", () => {
  beforeEach(() => {
    mockQuery.mockReset();
  });
  it("should update a user", async () => {
    const input = {
      name: "Muhammad Riaz Updated",
      email: "riaz.updated@example.com",
    };

    const updatedUser = {
      id: 1,
      name: input.name,
      email: input.email,
      created_at: new Date(),
    };

    mockQuery.mockResolvedValueOnce({
      rows: [updatedUser],
    });

    const result = await updateUser(1, input);

    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("UPDATE users"),
      [input.name, input.email, 1],
    );

    expect(result).toEqual(updatedUser);
  });

  it("should return undefined when updating a user that does not exist", async () => {
    const input = {
      name: "Unknown User",
      email: "unknown@example.com",
    };

    mockQuery.mockResolvedValueOnce({
      rows: [],
    });

    const result = await updateUser(999, input);

    expect(result).toBeUndefined();
  });
});

describe("deleteUser", () => {
  beforeEach(() => {
    mockQuery.mockReset();
  });
  it("should delete a user", async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [{ id: 1 }],
    });

    const result = await deleteUser(1);

    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("DELETE FROM users"),
      [1],
    );

    expect(result).toEqual({ id: 1 });
  });
  it("should return undefined when deleting a user that does not exist", async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [],
    });

    const result = await deleteUser(999);

    expect(result).toBeUndefined();
  });
});
