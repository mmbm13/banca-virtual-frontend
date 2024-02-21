/* eslint-disable no-unused-vars */
import { DataProvider, HttpError, fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = import.meta.env.VITE_API_URL;

export interface DataProviderWithCustomMethods extends DataProvider {
  httpFetch: (resource: string, options: fetchUtils.Options) => Promise<any>;
}

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const customHeaders = (options.headers ||
    new Headers({
      Accept: "application/json",
    })) as Headers;
  // add your own headers here
  // customHeaders.set('X-Custom-Header', 'foobar');
  options.headers = customHeaders;

  const token = localStorage.getItem("token");
  const user = { token: `Bearer ${token}`, authenticated: !!token };
  options.user = user;

  return fetchUtils.fetchJson(url, options).catch((err: HttpError) => {
    let message = err.message;
    if (Array.isArray(err.message)) {
      message = err.message.join(", ");
    }
    return Promise.reject(new HttpError(message, err.status, {}));
  });
};

const dataProvider: DataProviderWithCustomMethods = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: field,
      order,
      start: (page - 1) * perPage,
      end: page * perPage,
      ...fetchUtils.flattenObject(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json, headers } = await httpClient(url);
    if (resource === "products/student") {
      localStorage.setItem(
        "canCreateLoan",
        headers.get("X-Allow-Create") || ""
      );
      localStorage.setItem(
        "hasPendingPayment",
        headers.get("X-Pending-Payment") || ""
      );
    }
    return {
      data: json,
      total: Number(headers.get("X-Total-Count")),
    };
  },

  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url);
    return { data: json };
  },

  getMany: async (resource, params) => {
    const query = {
      id: params.ids,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url);
    return { data: json };
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: field,
      order,
      start: (page - 1) * perPage,
      end: page * perPage,
      ...fetchUtils.flattenObject(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json, headers } = await httpClient(url);
    return {
      data: json,
      total: Number(headers.get("X-total")),
    };
  },

  create: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  update: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  updateMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  delete: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: "DELETE",
    });
    return { data: json };
  },

  deleteMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url, {
      method: "DELETE",
      body: JSON.stringify((params as any).data),
    });
    return { data: json };
  },

  httpFetch: async (resource, options) => {
    return httpClient(`${apiUrl}/${resource}`, options);
  },
};

export default dataProvider;
