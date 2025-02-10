import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from '../components/ProjectCard';

describe('ProjectCard', () => {
    const mockProject = {
        tokenName: 'TestToken',
        contractAddress: '0x1234567890abcdef',
        liquidity: 10,
        firstTradeTimestamp: '2022-01-01T00:00:00Z',
        dexScreenerLink: 'www.google.com',
    };

    it('renders project token name and liquidity', () => {
        render(<ProjectCard project={mockProject} />);

        // Check if the project token name and liquidity are rendered correctly
        expect(screen.getByText('TestToken')).toBeInTheDocument();
        expect(screen.getByText('$10.00')).toBeInTheDocument();
    });
});
