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
            return result;
        } catch (err) {
            return err
        }

    }
    public async Find(id: number) {
        try {
            const result = client.query(`SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = ${id}`)
            return result;
        } catch (err) {
            return err
        }
    }

}

export default BaseModel