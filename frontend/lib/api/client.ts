import { env } from "@/lib/config/env";

type RequestOptions = RequestInit & {
  auth?: boolean;
};

export const apiClient = {
  async request<T>(
    path: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const { headers, ...requestOptions } = options;

    const requestHeaders = new Headers(headers);

    requestHeaders.set("Content-Type", "application/json");

    const url = `${env.NEXT_PUBLIC_API_URL}${path}`;

    const response = await fetch(url, {
      ...requestOptions,
      headers: requestHeaders,
      credentials: "include",
    });

    if (!response.ok) {
      let message = "An unexpected error occurred";

      try {
        const errorBody = await response.json();

        if (typeof errorBody.message === "string") {
          message = errorBody.message;
        }
      } catch {
        // Keep the default error message.
      }

      throw new Error(message);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  },

  get<T>(path: string, options?: RequestOptions) {
    return apiClient.request<T>(path, {
      ...options,
      method: "GET",
    });
  },

  post<T>(
    path: string,
    body?: unknown,
    options?: RequestOptions,
  ) {
    return apiClient.request<T>(path, {
      ...options,
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  },

  put<T>(
    path: string,
    body?: unknown,
    options?: RequestOptions,
  ) {
    return apiClient.request<T>(path, {
      ...options,
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  },

  delete<T>(path: string, options?: RequestOptions) {
    return apiClient.request<T>(path, {
      ...options,
      method: "DELETE",
    });
  },
};