export abstract class IDatabaseRepository<T> {
  abstract save(doc: T): Promise<T>;
  abstract delete(doc: T): Promise<T>;
  abstract create(): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract findOneBy(options: object): Promise<T>;
  abstract find(where: any, relations?: string[]): Promise<T[]>;
  /*
   * Find by advance options
   * @see https://typeorm.io/find-options
   */
  abstract findBy(query: Record<string, any>): Promise<T[]>;
  abstract findByCondition(filterCondition: any): Promise<T>;
  abstract rawQuery(expression: string, parameters?: any[]): Promise<T[]>;
}
