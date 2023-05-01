import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import { AxiosHttpFixture } from '../../../config/AxiosHttpFixture';
import { useHomeHelper } from '../../../../src/primary/pages/home/HomeHelper';
import { Song } from '../../../../src/domain/Song';

vi.mock('../../src/config/AxiosHttp'); 
const axiosHttp = AxiosHttpFixture({
	get: vi.fn(() => Promise.resolve({
		data: [
			{ artistName: 'artist1', name: 'song1', numberOfListening: 2 },
			{ artistName: 'artist2', name: 'song2', numberOfListening: 1 },
			{ artistName: 'artist3', name: 'song3', numberOfListening: 8 },
		],
		status: 200,
		statusText: 'OK',
		headers: {},
		config: {},
	})) as any,
});

describe('useHomeHelper', () => {
	it('Should fetch top songs', async () => {
		const { result, rerender } = renderHook(() => useHomeHelper({ axiosHttp }));

		rerender();
    
		await waitFor(() => {
			expect(result.current.topSongs).toEqual([
				Song.of('artist1', 'song1', 2),
				Song.of('artist2', 'song2', 1),
				Song.of('artist3', 'song3', 8),
			]);
		});
	});
});