import pg from 'pg';

// docker 5434
// pgAmin 5432
const connectionString = 'postgresql://postgres:root@localhost:5432/dbtest'
const {Pool} = pg;

export const pool = new Pool({
    connectionString,
    allowExitOnIdle: true,
});
