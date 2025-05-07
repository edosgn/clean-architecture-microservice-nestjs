import { Inventory } from '@warehouse/infrastructure/entities/db/inventory.entity';
import { Repository } from 'typeorm';
import { InventoryRepositoryImpl } from '@warehouse/infrastructure/repositories/inventory.repository.impl';

describe('InventoryRepositoryImpl', () => {
  let repository: InventoryRepositoryImpl;
  let mockRepo: jest.Mocked<Repository<Inventory>>;

  beforeEach(() => {
    mockRepo = {
      save: jest.fn(),
      findOneBy: jest.fn(),
    } as any;

    repository = new InventoryRepositoryImpl(mockRepo);
  });

  it('should call save with correct inventory', async () => {
    // Arrange
    const inventory = {
      ingredient: { id: 1 },
      quantity: 20,
    } as Inventory;

    mockRepo.save.mockResolvedValue(inventory);

    // Act
    const result = await repository.save(inventory);

    // Assert
    expect(mockRepo.save).toHaveBeenCalledWith(inventory);
    expect(result).toEqual(inventory);
  });

  it('should call findOneBy with correct criteria', async () => {
    // Arrange
    const criteria = { ingredient: { id: 1 } };
    const expected = {
      id: 5,
      ingredient: { id: 1 },
      quantity: 50,
    } as Inventory;

    mockRepo.findOneBy.mockResolvedValue(expected);

    // Act
    const result = await repository.findOneBy(criteria);

    // Assert
    expect(mockRepo.findOneBy).toHaveBeenCalledWith(criteria);
    expect(result).toEqual(expected);
  });
});
