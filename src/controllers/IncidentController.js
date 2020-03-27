const connection = require('../database/connection');

module.exports = {
    async index(req, res) {

        const { page = 1 } = req.query; //by default if I dont send the page, it will be page 1

        const [count] = await connection('incidents').count(); //will count the number of incidents registred and [count] to take the first item from the array

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5) //send 5 incidents each time
            .offset((page - 1) * 5) //pagination rule, will scape the first page and mutiply by the number in each page
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        res.header('X-Total-Count', count['count(*)']) // it will be send on the header to front-end know how many cases

        return res.json(incidents);
    },

    async create(req, res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return res.json({ id });
    },

    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return res.status(401).json({ error: 'Operation not permitted.' })
        }

        await connection('incidents').where('id', id).delete();

        return res.status(204).send();
    }
};