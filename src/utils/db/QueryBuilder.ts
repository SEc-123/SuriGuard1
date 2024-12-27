export class QueryBuilder {
  private query: string = '';
  private params: any[] = [];

  select(fields: string[]): QueryBuilder {
    this.query = `SELECT ${fields.join(', ')}`;
    return this;
  }

  from(table: string): QueryBuilder {
    this.query += ` FROM ${table}`;
    return this;
  }

  where(conditions: Record<string, any>): QueryBuilder {
    const whereClause = Object.entries(conditions)
      .filter(([_, value]) => value !== undefined)
      .map(([key, _]) => `${key} = ?`)
      .join(' AND ');
    
    if (whereClause) {
      this.query += ` WHERE ${whereClause}`;
      this.params.push(...Object.values(conditions).filter(v => v !== undefined));
    }
    return this;
  }

  build(): [string, any[]] {
    return [this.query, this.params];
  }
}