import { render, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

describe('App', () => {
    test('fetches projects from API on mount', async () => {
        const mockResponse = {
            ok: true,
            json: () => Promise.resolve([
                {
                    contractAddress: '0x123',
                    name: 'Test Project',
                    symbol: 'TEST',
                    liquidity: 40,
                    holders: 100
                }
            ]),
            status: 200,
            statusText: 'OK',
            headers: new Headers(),
            redirected: false,
            type: 'basic' as ResponseType,
            url: 'http://localhost:3000/projects',
            clone: () => mockResponse,
            body: null,
            bodyUsed: false,
            arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
            blob: () => Promise.resolve(new Blob()),
            formData: () => Promise.resolve(new FormData()),
            text: () => Promise.resolve(''),
        } as Response;

        global.fetch = jest.fn(() => Promise.resolve(mockResponse));

        await act(async () => {
            render(<App />)
        })

        await act(async () => {
            // Wait for all promises to resolve
            await Promise.resolve()
        })

        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/projects')
        expect(fetch).toHaveBeenCalledTimes(1)
    })
})