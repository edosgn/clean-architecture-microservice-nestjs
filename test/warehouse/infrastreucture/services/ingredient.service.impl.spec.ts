import { IngredientServiceImpl } from '@warehouse/infrastructure/services/ingredient.service.impl';
import { IIngredientRepository } from '@warehouse/domain/repositories/ingredient.repository';
import { GetOneIngredientByNameEntity } from '@warehouse/domain/entities/ingredient.entity';
import { Ingredient } from '@warehouse/infrastructure/entities/db/ingredient.entity';

describe('IngredientServiceImpl', () => {
  let service: IngredientServiceImpl;
  let mockRepository: jest.Mocked<IIngredientRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findOneBy: jest.fn(),
    } as unknown as jest.Mocked<IIngredientRepository>;

    service = new IngredientServiceImpl(mockRepository);
  });

  it('should call save and return created ingredient', async () => {
    // Arrange
    const payload: Ingredient = { name: 'Tomato' } as Ingredient;
    const expected: Ingredient = { id: 1, name: 'Tomato' } as Ingredient;

    mockRepository.save.mockResolvedValue(expected);

    // Act
    const result = await service.create(payload);

    // Assert
    expect(mockRepository.save).toHaveBeenCalledWith(payload);
    expect(result).toEqual(expected);
  });

  it('should call findOneBy with correct name', async () => {
    // Arrange
    const payload: GetOneIngredientByNameEntity = { name: 'Onion' };
    const expected: Ingredient = { id: 2, name: 'Onion' } as Ingredient;

    mockRepository.findOneBy.mockResolvedValue(expected);

    // Act
    const result = await service.findOneByName(payload);

    // Assert
    expect(mockRepository.findOneBy).toHaveBeenCalledWith(payload);
    expect(result).toEqual(expected);
  });
});
