import client from "../../utils/db";
client.connect().then(() => console.log("Connected to database")).catch((err) => console.log(err.message))

class BaseModel {
    protected client = client;
    protected tableName: string = "siswa";
    protected primaryKey: string = "id";



    public HelloWorld() {
        console.log("hello world");

        return "Hello world"
    }

    public async All() {
        try {


            const result = this.client.query(`SELECT * FROM ${this.tableName}`)
            return (await result).rows;
        } catch (err) {
            return err
        }

    }
    public async FindByID(id: number) {
        try {
            const result = this.client.query(`SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = ${id}`)
            return (await result).rows;
        } catch (err) {
            return err
        }
    }
    public async Find(condition: object) {
        try {
            let query = `SELECT * FROM ${this.tableName} WHERE `;
            let i = 0;
            for (const key in condition) {
                if (i > 0) {
                    query += " AND ";
                }
                query += `${key} = '${condition[key]}'`;
                i++;
            }
            // console.log(query);

            const result = this.client.query(query)
            return (await result).rows;
        } catch (err) {
            return err
        }
    }
    public async insert(data: object) {
        try {
            let query = `INSERT INTO ${this.tableName} (`;
            let values = "VALUES (";
            let i = 0;
            for (const key in data) {
                if (i > 0) {
                    query += ", ";
                    values += ", ";
                }
                query += key;
                values += `'${data[key]}'`;
                i++;
            }
            query += ") ";
            values += ") ";
            query += values;
            // console.log(query);


            const result = this.client.query(query)
            // console.log(await result);

            return result
        } catch (err) {
            console.log(err);
            return err

        }
    }

    public async dropById(id: number) {
        try {
            const result = this.client.query(`DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = ${id}`)
            return (await result).rows;
        } catch (err) {
            return err
        }
    }
    public async drop(condition: object) {
        try {
            let query = `DELETE FROM ${this.tableName} WHERE `;
            let i = 0;
            for (const key in condition) {
                if (i > 0) {
                    query += " AND ";
                }
                query += `${key} = '${condition[key]}'`;
                i++;
            }
            // console.log(query);

            const result = this.client.query(query)
            return (await result).rows;
        } catch (err) {
            return err
        }
    }

}

export default BaseModel