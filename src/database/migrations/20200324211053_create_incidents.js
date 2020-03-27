
exports.up = function (knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments(); //create primary key 
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('id').inTable('ongs'); //referencing the ong table 
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('incidents');
};

//npx knex migrate:rollback - rollback the last action