
const db = require('./db')
const fs = require('fs')

const initMigration = async(connection) => {
    const [ results ] = await connection.query(`show tables like 'migration_version'`)
    // nao iniciado
    if (results.length === 0) {
        await connection.query('START TRANSACTION;')
        await connection.query(`
            CREATE TABLE migration_version (
                id INT NOT NULL AUTO_INCREMENT,
                version INT NOT NULL,
                PRIMARY KEY (id)
            );
        `)
        await connection.query('INSERT INTO migration_version (id, version) values (1,0)')
        await connection.query('COMMIT;')
    }
}

const getCurrentVersion = async(connection) => {
    const [results] = await connection.query('select * from migration_version where id = 1')
    return results[0].version
}

const migration = async() => {
    const connection = await db
    await initMigration(connection)

    const currentVersion = await getCurrentVersion(connection)
    let targetVersion = 1000
    // parametros
    if(process.argv.length > 2){
        if(process.argv[2] === '--target-version' && process.argv[3]){
            targetVersion = parseInt(process.argv[3])
        }
    }
    console.log('Migrating to: ', targetVersion)

    const migrations = fs.readdirSync('./migrations')
    const migrationSorted = migrations
        .map(version => {
            return version.split('.')[0]
        })
        .map(version => parseInt(version))
        .sort((a, b) => {
            if(a > b){
                return 1
            }
            return -1
        })

    const migrationSorted2 = [...migrationSorted].sort((a, b) => {
        if(a > b){
            return -1
        }
        return 1
    })
    
    // up
    for await(const migration of migrationSorted) {
        if(migration > currentVersion && targetVersion >= migration){
            const m = require('./migrations/'+migration+'.js')
            await connection.query('START TRANSACTION;')
            if(m.up){
                await m.up(connection)
                console.log('Migration UP:', migration)
            }
            await connection.query('update migration_version set version = ? where id = ?', [migration, 1])
            await connection.query('COMMIT;')
        }
    }
    // down
    for await(const migration of migrationSorted2){
        if(migration <= currentVersion && targetVersion < migration){
            const m = require('./migrations/'+migration+'.js')
            await connection.query('START TRANSACTION;')
            if(m.down){
                await m.down(connection)
                console.log('Migration DOWN:', migration)
            }
            const currentMigration = migrationSorted2[migrationSorted2.indexOf(migration) + 1] || 0
            await connection.query('update migration_version set version = ? where id = ?', [currentMigration, 1])            
            await connection.query('COMMIT;')
        }
    }
    await connection.close()
}
migration()

//https://github.com/tuliofaria/fsm-acesso-bds/tree/master/acesso-mysql
//http://localhost/phpmyadmin/
//node db.js 
//node migration.js
//node index.js
//http://localhost:3000/graphql
//req.params => contém parâmetros de rota (na parte do caminho do URL)
//req.query => contém os parâmetros de consulta de URL
//Implementar o CRUD (criar, retornar, atualizar e excluir) de categorias tanto em REST quanto em GraphQL :)
/*
Implementar o CRUD(create, return, update and delete) de categorias tanto em REST quanto em GraphQL:

(1) - Implementar o CRUD em categorias(categories) tanto em REST;

(2) - Implementar o CRUD em categorias(categories) tanto em GraphQL;


Resume =>

const createCategory = async(req, res) => {
    const { categories_products, category_id } = req.body
    await Product.findAllByCategory(req.params.id, [ categories_products, category_id ])
    res.send({
        success: true,
        data: req.body
    })
}
*/
​