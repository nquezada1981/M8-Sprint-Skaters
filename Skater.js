import {pool} from './connection.js';

export class Skater {
    constructor() {
        this.id ;
        this.email ;
        this.nombre;
        this.password;
        this.yearsExperiencia;
        this.especialidad;
        this.foto;
        this.estado;
    }


    async newSkater(email, nombre, password, yearsExperiencia, especialidad, foto) {
        console.log(email, nombre, password, yearsExperiencia, especialidad, foto);
        await pool.query(`INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto) VALUES ($1, $2, $3, $4, $5, $6)`, [ email, nombre, password, yearsExperiencia, especialidad, foto]);
        
    }

    async getSkater(nombre, password) {
        const skater = await pool.query(`SELECT COUNT(1) FROM skaters WHERE nombre = $1 AND password = $2`, [nombre, password]);
        return skater.rows[0].count;
    }

    async getskaters() {
        const result = await pool.query(`SELECT nombre, anos_experiencia, especialidad, foto, estado FROM skaters`);
        return result.rows
    }


}    