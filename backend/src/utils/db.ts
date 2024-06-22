import pg from 'pg'
const { Client } = pg

const client = new Client({
    user: process.env.DB_USER || '',
    password: process.env.DB_PASWD || '',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'pilkosis',
})

export default client;