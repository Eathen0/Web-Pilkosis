import BaseModel from "./Main/BaseModels";

class PaslonModel extends BaseModel {
    protected tableName: string = "calon"
    protected primaryKey: string = "id"

    public async vote(id: number) {
        try {
            // this.client.query("BEGIN")
            const count = this.client.query(`SELECT total FROM ${this.tableName} WHERE ${this.primaryKey} = ${id}`);
            const countBefore = (await count).rows[0].total;
            const vote = await this.client.query(`UPDATE ${this.tableName} SET total = ${countBefore + 1} WHERE ${this.primaryKey} = ${id}`);
            return vote
        } catch (err) {
            this.client.query("ROLLBACK")
            return err

        }
    }
}

export default PaslonModel;