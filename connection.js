import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    user: 'bastianpoloni',
    database: 'skatepark',
    password: '',
    port: 5432
});

pool.connect();

export { pool };