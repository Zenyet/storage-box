import RequestInit = NodeJS.RequestInit;

export async function request<T>(url: string, extended: RequestInit): Promise<T> {
  return await (await fetch(url, {
    method: extended.method ?? 'GET',
    ...extended,
  })).json();
}
