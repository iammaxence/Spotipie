export class HttpHelper {
  private static QUERY_PARAMS_PREFIX = '?';

  public static async post(url, body): Promise<Response> {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(body)
    })
  }

  public static async get(url, params): Promise<Response> {
    console.log(params);
    return await fetch(url+this.QUERY_PARAMS_PREFIX+params, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
  }
}