// BaseModel.ts
import pool from '../../utils/db';  

class BaseModel {
    protected client = pool;  
    protected tableName: string = "siswa";
    protected primaryKey: string = "id";

    public HelloWorld() {
        console.log("hello world");
        return "Hello world";
    }

    public async All() {
        try {
            const [rows] = await this.client.query(`SELECT * FROM ${this.tableName}`);
            return rows;
        } catch (err) {
            return err;
        }
    }

    public async FindByID(id: number) {
        try {
            const [rows] = await this.client.query(`SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = ?`, [id]);
            return rows;
        } catch (err) {
            return err;
        }
    }

    public async Find(condition: { [key: string]: any }): Promise<any> { 
        try {
            let query = `SELECT * FROM ${this.tableName} WHERE `;
            const values: any[] = [];
            let i = 0;
            for (const key in condition) {
                if (i > 0) {
                    query += " AND ";
                }
                query += `${key} = ?`;
                values.push(condition[key]);
                i++;
            }
    
            console.log('Executing query:', query); 
            console.log('With values:', values);    
            
            const [ rows ] = await this.client.query(query, values);
            
            return rows;
        } catch (err) {
            console.error('Error executing query:', err); 
            throw new Error('Database query failed'); 
        }
    }

    public async insert(data: {[key: string] : any }): Promise<any> { 
        try {
            let query = `INSERT INTO ${this.tableName} (`;
            let placeholders = "VALUES (";
            const values = [];
            let i = 0;

            for (const key in data) {
                if (i > 0) {
                    query += ", ";
                    placeholders += ", ";
                }
                query += key;
                placeholders += "?";
                values.push(data[key]);
                i++;
            }
            query += ") ";
            placeholders += ") ";
            query += placeholders;

            const [result] = await this.client.query(query, values);
            return result;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    // Method untuk memperbarui data berdasarkan ID
    public async updateById(id: number, data: { [key: string]: any }): Promise<any> {
        try {
            let query = `UPDATE ${this.tableName} SET `;
            const values = [];
            let i = 0;

            for (const key in data) {
                if (i > 0) {
                    query += ", ";
                }
                query += `${key} = ?`;
                values.push(data[key]);
                i++;
            }

            query += ` WHERE ${this.primaryKey} = ?`;
            values.push(id);

            const [result] = await this.client.query(query, values);
            return result;
        } catch (err) {
            console.error('Error updating record:', err);
            throw new Error('Failed to update record');
        }
    }

    public async dropById(id: number) {
        try {
            const [result] = await this.client.query(`DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = ?`, [id]);
            return result;
        } catch (err) {
            return err;
        }
    }

    public async drop(condition: {[key: string] : any}) { 
        try {
            let query = `DELETE FROM ${this.tableName} WHERE `;
            const values = [];
            let i = 0;
            for (const key in condition) {
                if (i > 0) {
                    query += " AND ";
                }
                query += `${key} = ?`;
                values.push(condition[key]);
                i++;
            }

            const [result] = await this.client.query(query, values);
            return result;
        } catch (err) {
            return err;
        }
    }
    public async insertMany(dataArray: { [key: string]: any }[]): Promise<any> {
        try {
            if (dataArray.length === 0) {
                throw new Error('No data provided for insertion');
            }
    
            let query = `INSERT INTO ${this.tableName} (`;
            const placeholders = [];
            const values: any[] = [];
    
            // Ambil keys dari data pertama, asumsinya semua data memiliki struktur field yang sama
            const keys = Object.keys(dataArray[0]);
    
            // Buat placeholder untuk keys
            query += keys.join(', ') + ') VALUES ';
    
            // Loop melalui setiap data di dataArray dan buat placeholder untuk masing-masing baris
            dataArray.forEach((data, index) => {
                if (index > 0) {
                    query += ", ";
                }
    
                const rowPlaceholders = keys.map(() => '?').join(', ');
                query += `(${rowPlaceholders})`;
    
                keys.forEach((key) => {
                    values.push(data[key]);
                });
            });
    
            const [result] = await this.client.query(query, values);
            return result;
        } catch (err) {
            console.error('Error inserting multiple records:', err);
            throw new Error('Failed to insert multiple records');
        }
    }    
}


export default BaseModel;
