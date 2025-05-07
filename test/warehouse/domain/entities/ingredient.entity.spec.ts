import {
  GetOneIngredientByNameEntity,
  IngredientEntity,
} from '@warehouse/domain/entities/ingredient.entity';

describe('IngredientEntity', () => {
  it('should create an IngredientEntity with all fields', () => {
    // Arrange
    const ingredient = new IngredientEntity();

    // Act
    ingredient.id = 1;
    ingredient.name = 'Salt';
    ingredient.created_at = new Date('2023-01-01T00:00:00Z');

    // Assert
    expect(ingredient.id).toBe(1);
    expect(ingredient.name).toBe('Salt');
    expect(ingredient.created_at?.toISOString()).toBe(
      '2023-01-01T00:00:00.000Z',
    );
  });

  it('should create an IngredientEntity with only required fields', () => {
    // Arrange
    const ingredient = new IngredientEntity();

    // Act
    ingredient.name = 'Pepper';

    // Assert
    expect(ingredient.name).toBe('Pepper');
    expect(ingredient.id).toBeUndefined();
    expect(ingredient.created_at).toBeUndefined();
  });
});

describe('GetOneIngredientByNameEntity', () => {
  it('should create a valid GetOneIngredientByNameEntity', () => {
    // Arrange
    const query = new GetOneIngredientByNameEntity();

    // Act
    query.name = 'Onion';

    // Assert
    expect(query.name).toBe('Onion');
  });
});
