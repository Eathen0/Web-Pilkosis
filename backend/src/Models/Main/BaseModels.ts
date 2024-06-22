import client from "../../utils/db";
client.connect().then(() => console.log("Connected to database")).catch((err) => console.log(err.message));


class BaseModel {
    protected tableName: string = "siswa";
    protected primaryKey: string = "id";

    public HelloWorld() {
        console.log("hello world");
        return "Hello world"
    }

    public async All() {
        try {
            const result = client.query(`SELECT * FROM ${this.tableName}`)
            return (await result).rows;
        } catch (err) {
            return err
        }

    }
    public async FindByID(id: number) {
        try {
            const result = client.query(`SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = ${id}`)
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

            const result = client.query(query)
            return (await result).rows;
        } catch (err) {
            return err
        }
    }


}

export default BaseModel