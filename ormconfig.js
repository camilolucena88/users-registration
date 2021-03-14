module.exports = {
    "type": "postgres",
    "host": "postgres",
    "port": parseInt(process.env.POSTGRES_PORT) || 5432,
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DATABASE,
    "entities": [
        "src/**/entity/*.ts"
    ],
    "synchronize": false,
    "migrationsTableName": "migrations",
    "migrations": [
        "src/database/migrations/*.ts"
    ],
    "cli": {
        "migrationsDir": "src/database/migrations"
    }
}