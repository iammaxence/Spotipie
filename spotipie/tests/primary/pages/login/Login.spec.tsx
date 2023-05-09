// import React from 'react';
// import { render } from '@testing-library/react';
// import { describe, expect, it } from 'vitest';
// import { Login } from '../../../../src/primary/pages/login/Login';
// import { AxiosHttpFixture } from '../../../secondary/http/AxiosHttpFixture';

// describe('Login', () => {

// 	const axiosHttp = AxiosHttpFixture();
  
// 	it('should render title', () => {
// 		const { getByText } = render(<Login axiosHttp={axiosHttp} />);
    
// 		const title = getByText('Welcome to SpotiPie');

// 		expect(title).toBeDefined();
// 	});

// 	it('should render button', () => {
// 		const { getByText } = render(<Login axiosHttp={axiosHttp} />);

// 		const button = getByText('Login');

// 		expect(button).toBeDefined();
// 	});
// });