import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import { useHomeHelper } from '../../../../src/primary/component/home/HomeHelper';
import { Song } from '../../../../src/domain/Song';
import { AxiosHttpFixture } from '../../../secondary/http/AxiosHttpFixture';
import { Artist } from '../../../../src/domain/Artist';
import { UserAdapterFixture } from '../../../secondary/user/UserAdapterFixture';

vi.mock('../../src/config/AxiosHttp'); 
const userAdapterMock = UserAdapterFixture({
	getTopSongs: vi.fn().mockImplementation(() => Promise.resolve(
		[
			Song.of([Artist.of('artist1')], 'song1', 'albumName1', 'fake_image'),
			Song.of([Artist.of('artist2')], 'song2', 'albumName2', 'fake_image2'),
			Song.of([Artist.of('artist3')], 'song3', 'albumName3', 'fake_image3')
		],
	)),
});

vi.mock('react-router-dom', () => ({
	useNavigate: () => vi.fn(),
}));
				
describe('useHomeHelper', () => {
	it('Should fetch top songs', async () => {
		const { result, rerender } = renderHook(() => useHomeHelper({ userAdapter: userAdapterMock }));

		rerender();
    
		await waitFor(() => {
			expect(result.current.topSongs).toEqual([]);
		});
	});
});