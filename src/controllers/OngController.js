const crypto = require('crypto');
const connection = require('../database/connection')

module.exports = {
    async index(req, res) {
        const ongs = await connection('ongs').select('*');

        return res.json(ongs);
    },

    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;

        const id = crypto.randomBytes(4).toString('HEX'); //creating 4bytes id in a hexdecimal

        await connection('ongs').insert({  //will wait to get response before load 
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
        return res.json({ id });
    }
}