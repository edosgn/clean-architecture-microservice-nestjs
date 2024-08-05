import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { Ingredient } from './ingredient.entity';

@Entity('inventories')
export class Inventory {
  @PrimaryColumn()
  @Generated('increment')
  id?: number;

  @OneToOne(() => Ingredient, (ingredient) => ingredient.inventory)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;

  @Column()
  quantity: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
