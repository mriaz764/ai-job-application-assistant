import { z } from "zod";

export const parseId = (value: string | string[]) => {
  const result = z.coerce.number().int().positive().safeParse(value);

  if (!result.success) {
    return null;
  }

  return result.data;
};
