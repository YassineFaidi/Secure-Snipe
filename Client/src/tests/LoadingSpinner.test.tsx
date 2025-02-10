import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../components/LoadingSpinner';

describe('LoadingSpinner', () => {
    it('renders correctly', () => {
        render(<LoadingSpinner />);

        // Check if the loading message is rendered
        expect(screen.getByText('Loading projects...')).toBeInTheDocument();
    });
});
