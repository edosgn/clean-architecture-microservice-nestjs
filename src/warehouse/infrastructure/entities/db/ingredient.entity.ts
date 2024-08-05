import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity('ingredients')
export class Ingredient {
  @PrimaryColumn()
  @Generated('increment')
  id?: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
