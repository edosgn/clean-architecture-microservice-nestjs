import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity('inventories')
export class Inventory {
  @PrimaryColumn()
  @Generated('increment')
  id?: number;

  @Column({ unique: true })
  ingredient_id: number;

  @Column()
  quantity: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
