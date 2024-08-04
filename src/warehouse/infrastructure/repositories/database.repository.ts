import { FindOptionsWhere, Repository } from 'typeorm';
import { IDatabaseRepository } from '@warehouse/domain/repositories/database.repository';

export abstract class DatabaseRepository<T> implements IDatabaseRepository<T> {
  private entity: Repository<T>;

  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  public async create(): Promise<T> {
    return this.entity.create();
  }

  public async save(doc: T): Promise<T> {
    return this.entity.save(doc);
  }

  public async findOneBy(
    options: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<T> {
    return this.entity.findOneBy(options);
  }

  public async findByCondition(filterCondition: any): Promise<T> {
    return this.entity.findOne({ where: filterCondition });
  }

  public async find(where: any, relations: string[]): Promise<T[]> {
    return this.entity.find({ where, relations });
  }

  public async findBy(query: Record<string, any>): Promise<T[]> {
    return this.entity.findBy(query);
  }

  public async findAll(): Promise<T[]> {
    return this.entity.find();
  }

  public async delete(doc: any): Promise<T> {
    await this.entity.delete(doc);
    return doc;
  }

  public async rawQuery(expression: string, parameters?: any[]): Promise<T[]> {
    return await this.entity.query(expression, parameters);
  }
}
