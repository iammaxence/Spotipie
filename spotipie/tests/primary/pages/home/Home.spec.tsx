import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import { useHomeHelper } from '../../../../src/primary/pages/home/HomeHelper';
import { Song } from '../../../../src/domain/Song';
import { AxiosHttpFixture } from '../../../secondary/http/AxiosHttpFixture';

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

vi.mock('react-router-dom', () => ({
	useNavigate: () => vi.fn(),
}));
				
describe('useHomeHelper', () => {
	it('Should fetch top songs', async () => {
		const { result, rerender } = renderHook(() => useHomeHelper({ axiosHttp }));

		rerender();
    
		await waitFor(() => {
			expect(result.current.topSongs).toEqual([
				Song.of('wejdene', 'coco', 12),
				Song.of('wejdene', 'tati', 12),
				Song.of('wejdene', 'toto', 12),
			]);
		});
	});
});