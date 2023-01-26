import { render, screen } from '@testing-library/react';
import { RecipeBoardHeader } from '.';
import { mockCategories } from '../../utils/mock';

describe('RecipeBoardHeader test suite', () => {
  const mockAddRecipe = jest.fn();
  const mockSearchChange = jest.fn();
  const mockCategoryChange = jest.fn();
  it('RecipeBoardHeader should mount', () => {
    render(
      <RecipeBoardHeader
        search=''
        categories={mockCategories}
        currentCategories={[]}
        handleAddRecipe={mockAddRecipe}
        handleSearchChange={mockSearchChange}
        handleCategoryChange={mockCategoryChange}
      />,
    );
    const recipeBoardHeader = screen.getByTestId('recipeBoardHeader');
    expect(recipeBoardHeader).toBeInTheDocument();
  });
});
