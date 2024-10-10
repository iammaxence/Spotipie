export class HttpHelper {
  private static QUERY_PARAMS_PREFIX = '?';

  public static async post(url: string, body: string): Promise<Response> {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(body)
    })
  }

  public static async get(url: string, params: string, headers: string[{string: string}] = []): Promise<Response> {
    return await fetch(url+this.QUERY_PARAMS_PREFIX+params, {
      method: 'GET',
      headers: Object.assign({
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        },
        ...headers)
    })
  }
}