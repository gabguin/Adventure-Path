import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allows your Vite frontend to talk to this backend
app.use(express.json()); // Allows your server to parse JSON data sent from the frontend

// 1. Create the Connection Pool to your Local MySQL Database
const db = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '', 
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the database connection pool
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
    } else {
        console.log('✅ Connected to local MySQL database successfully!');
        connection.release(); // Return the connection back to the pool
    }
});

// --- YOUR CRUD API ENDPOINTS (ROUTES) GO HERE ---

const queryDb = (sql, params = []) => new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
        if (err) {
            return reject(err);
        }
        resolve(results);
    });
});

const getNextId = async (tableName, idColumn) => {
    const rows = await queryDb(`SELECT COALESCE(MAX(${idColumn}), 0) + 1 AS nextId FROM ${tableName}`);
    return rows[0]?.nextId ?? 1;
};

app.get('/api/pokemon', async (req, res) => {
    try {
        const results = await queryDb('SELECT * FROM pokemon ORDER BY pokemon_id');
        return res.json(results);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

app.get('/api/trainers', async (req, res) => {
    try {
        const results = await queryDb('SELECT trainer_id, username FROM trainer ORDER BY trainer_id DESC');
        return res.json(results);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

app.post('/api/trainers', async (req, res) => {
    try {
        const { username } = req.body;
        if (!username || !username.trim()) {
            return res.status(400).json({ error: 'A username is required.' });
        }

        const [existing] = await queryDb('SELECT trainer_id FROM trainer WHERE username = ?', [username.trim()]);
        if (existing) {
            return res.status(400).json({ error: 'Trainer already exists.' });
        }

        const trainerId = await getNextId('trainer', 'trainer_id');
        await queryDb('INSERT INTO trainer (trainer_id, username) VALUES (?, ?)', [trainerId, username.trim()]);
        return res.status(201).json({ trainer_id: trainerId, username: username.trim() });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

app.delete('/api/trainers/:trainerId', async (req, res) => {
    try {
        const trainerId = Number(req.params.trainerId);
        if (!trainerId) {
            return res.status(400).json({ error: 'Invalid trainer id.' });
        }

        await queryDb('DELETE tm FROM teammember tm JOIN team t ON tm.team_id = t.team_id WHERE t.trainer_id = ?', [trainerId]);
        await queryDb('DELETE FROM team WHERE trainer_id = ?', [trainerId]);
        const result = await queryDb('DELETE FROM trainer WHERE trainer_id = ?', [trainerId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Trainer not found.' });
        }

        return res.json({ trainer_id: trainerId });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

app.get('/api/teams', async (req, res) => {
    try {
        const rows = await queryDb(
            `SELECT t.team_id, t.team_name, t.trainer_id,
                    tm.team_member_id, tm.pokemon_id, tm.member_nickname,
                    p.species_name, p.base_hp, p.base_attack, p.base_defense, p.base_speed, p.primary_type_id, p.secondary_type_id
             FROM team t
             LEFT JOIN teammember tm ON t.team_id = tm.team_id
             LEFT JOIN pokemon p ON tm.pokemon_id = p.pokemon_id
             ORDER BY t.team_id DESC, tm.team_member_id ASC`
        );

        const teams = [];
        const teamMap = new Map();

        rows.forEach((row) => {
            if (!teamMap.has(row.team_id)) {
                teamMap.set(row.team_id, {
                    team_id: row.team_id,
                    team_name: row.team_name,
                    trainer_id: row.trainer_id,
                    pokemon: [],
                });
                teams.push(teamMap.get(row.team_id));
            }

            if (row.team_member_id) {
                teamMap.get(row.team_id).pokemon.push({
                    team_member_id: row.team_member_id,
                    pokemon_id: row.pokemon_id,
                    member_nickname: row.member_nickname,
                    species_name: row.species_name,
                    base_hp: row.base_hp,
                    base_attack: row.base_attack,
                    base_defense: row.base_defense,
                    base_speed: row.base_speed,
                    primary_type_id: row.primary_type_id,
                    secondary_type_id: row.secondary_type_id,
                });
            }
        });

        return res.json(teams);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

app.post('/api/teams', async (req, res) => {
    try {
        const { name, trainerId, pokemon } = req.body;
        if (!name || !trainerId || !Array.isArray(pokemon) || pokemon.length === 0) {
            return res.status(400).json({ error: 'Team name, trainer Id, and at least one Pokémon are required.' });
        }

        const teamId = await getNextId('team', 'team_id');
        await queryDb('INSERT INTO team (team_id, trainer_id, team_name) VALUES (?, ?, ?)', [teamId, Number(trainerId), name.trim()]);

        let nextMemberId = await getNextId('teammember', 'team_member_id');
        const insertPromises = pokemon.map((member) => {
            const memberId = nextMemberId++;
            return queryDb(
                'INSERT INTO teammember (team_member_id, team_id, pokemon_id, member_nickname) VALUES (?, ?, ?, ?)',
                [memberId, teamId, Number(member.pokemon_id), member.nickname || member.member_nickname || null],
            );
        });
        await Promise.all(insertPromises);

        return res.status(201).json({ team_id: teamId, team_name: name.trim(), trainer_id: Number(trainerId) });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

app.put('/api/teams/:teamId', async (req, res) => {
    try {
        const teamId = Number(req.params.teamId);
        const { name, trainerId, pokemon } = req.body;
        if (!teamId || !name || !trainerId || !Array.isArray(pokemon) || pokemon.length === 0) {
            return res.status(400).json({ error: 'Team ID, name, trainer Id, and at least one Pokémon are required.' });
        }

        const result = await queryDb('UPDATE team SET team_name = ?, trainer_id = ? WHERE team_id = ?', [name.trim(), Number(trainerId), teamId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Team not found.' });
        }

        await queryDb('DELETE FROM teammember WHERE team_id = ?', [teamId]);

        let nextMemberId = await getNextId('teammember', 'team_member_id');
        const insertPromises = pokemon.map((member) => {
            const memberId = nextMemberId++;
            return queryDb(
                'INSERT INTO teammember (team_member_id, team_id, pokemon_id, member_nickname) VALUES (?, ?, ?, ?)',
                [memberId, teamId, Number(member.pokemon_id), member.nickname || member.member_nickname || null],
            );
        });
        await Promise.all(insertPromises);

        return res.json({ team_id: teamId, team_name: name.trim(), trainer_id: Number(trainerId) });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

app.delete('/api/teams/:teamId', async (req, res) => {
    try {
        const teamId = Number(req.params.teamId);
        if (!teamId) {
            return res.status(400).json({ error: 'Invalid team id.' });
        }

        await queryDb('DELETE FROM teammember WHERE team_id = ?', [teamId]);
        const result = await queryDb('DELETE FROM team WHERE team_id = ?', [teamId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Team not found.' });
        }

        return res.json({ team_id: teamId });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Fetch live type chart matrix data on-demand
app.get('/api/typechart', (req, res) => {
    const sqlQuery = "SELECT * FROM typechart"; 
    
    db.query(sqlQuery, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(results);
    });
});

app.get('/api/types', async (req, res) => {
    try {
        const results = await queryDb('SELECT * FROM `type` ORDER BY type_id');
        return res.json(results);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});