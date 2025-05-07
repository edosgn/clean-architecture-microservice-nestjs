import {
  InventoryEntity,
  GetOneInventoryByIngredientIdEntity,
} from '@warehouse/domain/entities/inventory.entity';

describe('InventoryEntity', () => {
  it('should create a complete InventoryEntity', () => {
    // Arrange
    const inventory = new InventoryEntity();
    const now = new Date();

    // Act
    inventory.id = 1;
    inventory.ingredient_id = 101;
    inventory.quantity = 20;
    inventory.created_at = now;
    inventory.updated_at = now;

    // Assert
    expect(inventory.id).toBe(1);
    expect(inventory.ingredient_id).toBe(101);
    expect(inventory.quantity).toBe(20);
    expect(inventory.created_at).toBe(now);
    expect(inventory.updated_at).toBe(now);
  });

  it('should create InventoryEntity with only required fields', () => {
    // Arrange
    const inventory = new InventoryEntity();

    // Act
    inventory.ingredient_id = 202;
    inventory.quantity = 15;

    // Assert
    expect(inventory.ingredient_id).toBe(202);
    expect(inventory.quantity).toBe(15);
    expect(inventory.id).toBeUndefined();
    expect(inventory.created_at).toBeUndefined();
    expect(inventory.updated_at).toBeUndefined();
  });
});

describe('GetOneInventoryByIngredientIdEntity', () => {
  it('should create GetOneInventoryByIngredientIdEntity correctly', () => {
    // Arrange
    const query = new GetOneInventoryByIngredientIdEntity();

    // Act
    query.ingredient_id = 303;

    // Assert
    expect(query.ingredient_id).toBe(303);
  });
});
