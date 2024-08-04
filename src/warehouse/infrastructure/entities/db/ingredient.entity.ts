import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity('ingredients', { schema: process.env.DB_SCHEMA })
export class Ingredient {
  @PrimaryColumn()
  @Generated('increment')
  id?: number;

  @Column()
  name: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
