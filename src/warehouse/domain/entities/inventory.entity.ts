export class InventoryEntity {
  public id?: number;
  public ingredient_id: number;
  public quantity: number;
  public updated_at?: Date;
  public created_at?: Date;
}
export class GetOneInventoryByIngredientIdEntity {
  public ingredient_id: number;
}
