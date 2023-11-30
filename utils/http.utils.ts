type RequestOptions<BodyType> = {
  body?: BodyType;
  headers?: HeadersInit;
};

// Generic function to handle the request
async function request<ResponseType, BodyType = undefined>(
  url: string,
  method: string,
  options?: RequestOptions<BodyType>
): Promise<ResponseType> {
  const headers = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: options?.body ? JSON.stringify(options.body) : null,
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<ResponseType>;
}

// Typed functions for each HTTP method
export function GET<ResponseType>(url: string, options?: RequestOptions<undefined>) {
  return request<ResponseType, undefined>(url, 'GET', options);
}

export function POST<ResponseType, BodyType>(url: string, body: BodyType, options?: RequestOptions<BodyType>) {
  return request<ResponseType, BodyType>(url, 'POST', { ...options, body });
}

export function PATCH<ResponseType, BodyType>(url: string, body: BodyType, options?: RequestOptions<BodyType>) {
  return request<ResponseType, BodyType>(url, 'PATCH', { ...options, body });
}

export function DELETE<ResponseType>(url: string, options?: RequestOptions<undefined>) {
  return request<ResponseType, undefined>(url, 'DELETE', options);
}
