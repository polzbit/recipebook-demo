import { render, screen } from '@testing-library/react';
import { Pagination } from '.';

describe('Pagination test suite', () => {
  const mockNextClick = jest.fn();
  const mockPrevClick = jest.fn();
  it('Pagination should mount', () => {
    render(
      <Pagination
        page={1}
        maxItems={10}
        numOfItems={20}
        handleNextClick={mockNextClick}
        handlePrevClick={mockPrevClick}
      />,
    );
    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
  });
  it('Pagination should not mount', () => {
    render(
      <Pagination
        page={1}
        maxItems={10}
        numOfItems={0}
        handleNextClick={mockNextClick}
        handlePrevClick={mockPrevClick}
      />,
    );
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });
  it('Pagination buttons should be disabled', () => {
    render(
      <Pagination
        page={1}
        maxItems={10}
        numOfItems={5}
        handleNextClick={mockNextClick}
        handlePrevClick={mockPrevClick}
      />,
    );
    const prevButton = screen.getByTestId('prevButton');
    const nextButton = screen.getByTestId('nextButton');
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
});
