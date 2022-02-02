// Import stylesheets
import './style.css';

// Write TypeScript code!

class QueryBuilder {
  query: string = '';

  select(columns: string[] | '*', table: string) {
    this.query = `SELECT ${columns.toString()} FROM ${table} `;
    return this;
  }

  where(column: string, condition: string, value: string | number) {
    if (!this.query.includes('WHERE')) {
      this.query += 'WHERE ';
    }
    if (typeof value === 'string') {
      value = `'${value}'`;
    }
    this.query += `${column} ${condition} ${value} `;
    return this;
  }

  whereIn(column: string, values: string[] | number[]) {
    if (!this.query.includes('WHERE')) {
      this.query += 'WHERE ';
    }
    this.query += `${column} IN (${values.toString()}) `;
    return this;
  }

  and() {
    this.query += 'AND ';
    return this;
  }

  or() {
    this.query += 'OR ';
    return this;
  }

  not() {
    this.query += 'NOT ';
    return this;
  }

  orderBy(columns: string[], order: 'ASC' | 'DESC') {
    if (!this.query.includes('ORDER BY')) {
      this.query += 'ORDER BY ';
    } else {
      this.query += ', ';
    }
    this.query += `${columns.toString()} ${order} `;
    return this;
  }

  distinct() {
    this.query = this.query.replace('SELECT', 'SELECT DISTINCT');
    return this;
  }
}

const queryBuilder = new QueryBuilder();

queryBuilder
  .select(['name', 'age'], 'person')
  .where('id', '=', 1)
  .and()
  .where('name', 'LIKE', 'Yann')
  .or()
  .not()
  .whereIn('age', [15, 25])
  .orderBy(['id', 'name'], 'ASC')
  .orderBy(['age'], 'DESC')
  .distinct();

const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>${queryBuilder.query}</h1>`;
