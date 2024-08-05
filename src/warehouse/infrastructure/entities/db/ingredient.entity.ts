import { Column, Entity, Generated, OneToOne, PrimaryColumn } from 'typeorm';
import { Inventory } from './inventory.entity';
@Entity('ingredients')
export class Ingredient {
  @PrimaryColumn()
  @Generated('increment')
  id?: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToOne(() => Inventory, (inventory) => inventory.ingredient)
  inventory: Inventory;
}
