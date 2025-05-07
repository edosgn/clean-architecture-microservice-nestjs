import { IngredientRepositoryImpl } from '@warehouse/infrastructure/repositories/ingredient.repository.impl';
import { Ingredient } from '@warehouse/infrastructure/entities/db/ingredient.entity';
import { Repository } from 'typeorm';

describe('IngredientRepositoryImpl', () => {
  let repository: IngredientRepositoryImpl;
  let mockRepo: jest.Mocked<Repository<Ingredient>>;

  beforeEach(() => {
    mockRepo = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      findOneBy: jest.fn(),
    } as unknown as jest.Mocked<Repository<Ingredient>>;

    repository = new IngredientRepositoryImpl(mockRepo);
  });

  it('should be defined', () => {
    // Assert
    expect(repository).toBeDefined();
  });

  it('should call save with correct entity', async () => {
    // Arrange
    const ingredient = { name: 'Tomato' } as Ingredient;
    mockRepo.save.mockResolvedValue(ingredient);

    // Act
    const result = await repository.save(ingredient);

    // Assert
    expect(mockRepo.save).toHaveBeenCalledWith(ingredient);
    expect(result).toEqual(ingredient);
  });

  it('should call findOneBy with correct criteria', async () => {
    // Arrange
    const criteria = { name: 'Tomato' };
    const expected = { id: 1, name: 'Tomato' } as Ingredient;
    mockRepo.findOneBy.mockResolvedValue(expected);

    // Act
    const result = await repository.findOneBy(criteria);

    // Assert
    expect(mockRepo.findOneBy).toHaveBeenCalledWith(criteria);
    expect(result).toEqual(expected);
  });
});
