import { describe, it, expect, vi } from 'vitest'
import { HttpHelper } from '@/adapter/HttpHelper'

global.fetch = vi.fn(); // Mock fetch globally

describe('HttpHelper', () => {
  it('should make a POST request with the correct body', async () => {
    const mockResponse = { ok: true };
    fetch.mockResolvedValueOnce(mockResponse); // Mock the response

    const url = 'https://example.com/api';
    const body = { key: 'value' };

    const response = await HttpHelper.post(url, body);

    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(body)
    });
    expect(response).toEqual(mockResponse);
  });

  it('should make a GET request with the correct query parameters', async () => {
    const mockResponse = { ok: true };
    fetch.mockResolvedValueOnce(mockResponse); // Mock the response

    const url = 'https://example.com/api';
    const params = 'key=value';

    const response = await HttpHelper.get(url, params);

    expect(fetch).toHaveBeenCalledWith(url + '?key=value', {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
    expect(response).toEqual(mockResponse);
  });
});
