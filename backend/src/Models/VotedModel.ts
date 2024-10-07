import BaseModel from "./Main/BaseModels";
import { RowDataPacket, ResultSetHeader, OkPacket } from 'mysql2';
import pool from "../utils/db";


class VotedModel extends BaseModel {
    protected tableName: string = "voted";
    protected primaryKey: string = "id";

    public async insert(data: { user_id: number; voted_caksis?: number; voted_cawaksis?: number }): Promise<any> {
        try {
            const columns: string[] = ['user_id'];
            const values: any[] = [data.user_id];
            
            if (data.voted_caksis !== undefined) {
                columns.push('voted_caksis');
                values.push(data.voted_caksis);
            }

            if (data.voted_cawaksis !== undefined) {
                columns.push('voted_cawaksis');
                values.push(data.voted_cawaksis);
            }

            const query = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`;
            const [result] = await this.client.query(query, values);
            return result;
        } catch (err) {
            console.error("Error inserting into voted table:", err);
            throw err;
        }
    }
    public async update(
        data: { voted_caksis?: number; voted_cawaksis?: number },
        userId: number
    ): Promise<any> {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const [existingVoteRows] = await connection.query<RowDataPacket[]>(
                `SELECT voted_caksis, voted_cawaksis FROM ${this.tableName} WHERE user_id = ?`,
                [userId]
            );
    
            if (existingVoteRows.length === 0) {
                throw new Error("No existing vote found for the user");
            }
    
            const existingVote = existingVoteRows[0];
            const updates: string[] = [];
            const values: any[] = [];
    
            if (data.voted_caksis !== undefined) {
                updates.push("voted_caksis = ?");
                values.push(data.voted_caksis);
                if (data.voted_caksis) {
                    await connection.query<OkPacket>(
                        `UPDATE calon SET total = total + 1 WHERE id = ?`,
                        [data.voted_caksis]
                    );
                }
            }
    
            if (data.voted_cawaksis !== undefined) {
                updates.push("voted_cawaksis = ?");
                values.push(data.voted_cawaksis);
                if (data.voted_cawaksis) {
                    await connection.query<OkPacket>(
                        `UPDATE calon SET total = total + 1 WHERE id = ?`,
                        [data.voted_cawaksis]
                    );
                }
            }
    
            if (updates.length === 0) {
                throw new Error("No valid fields to update");
            }
    
            const query = `UPDATE ${this.tableName} SET ${updates.join(", ")} WHERE user_id = ?`;
            values.push(userId);
    
            const [result] = await connection.query<ResultSetHeader>(query, values);
            
            await connection.commit();
            console.log("Incrementing total for caksis:", data.voted_caksis);
            console.log("Incrementing total for cawaksis:", data.voted_cawaksis);
    
            return result;
        } catch (err) {
            await connection.rollback();
            console.error("Error updating voted table:", err);
            throw err;
        } finally {
            connection.release();
        }
    }

    public async updateTotalInCalon (id: number) {
        try {
            const query = `UPDATE calon SET total = (SELECT COUNT(*) FROM voted WHERE voted_caksis = ? or voted_cawaksis = ?) WHERE id = ?`;
            const [result] = await this.client.query<OkPacket>(query, [id, id, id]);
            console.log("Incrementing total for calon with id:", id);
            return result;
        } catch (err) {
            console.error("Error updating total in calon table:", err);
            throw err;
        } 
    }
    
    

    public async getAllVotes(): Promise<RowDataPacket[]> {
        try {
            const query = `SELECT ${this.tableName}.*, siswa.nama as pemilih FROM ${this.tableName} inner join siswa on ${this.tableName}.user_id = siswa.id`;
            const [results] = await this.client.query(query);
            return results as RowDataPacket[];
        } catch (err) {
            console.error("Error fetching votes:", err);
            throw err;
        }
    }

    public async countVotes(): Promise<number> {
        try {
            const query = `SELECT COUNT(*) as count FROM ${this.tableName}`;
            const [results] = await this.client.query<RowDataPacket[]>(query);
            return (results[0] as any).count;
        } catch (err) {
            console.error("Error counting votes:", err);
            throw err;
        }
    }


    public async deleteVoteById(id: number): Promise<ResultSetHeader> {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const [voteRecords] = await connection.query<RowDataPacket[]>(
                `SELECT voted_caksis, voted_cawaksis FROM ${this.tableName} WHERE ${this.primaryKey} = ?`,
                [id]
            );
    
            if (voteRecords.length === 0) {
                throw new Error('No vote record found for the given ID');
            }
    
            const voteRecord = voteRecords[0];
            const votedCaksis = voteRecord.voted_caksis;
            const votedCawaksis = voteRecord.voted_cawaksis;
            if (votedCaksis) {
                console.log(votedCaksis)
                await connection.query<OkPacket>(
                    `UPDATE calon SET total = total - 1 WHERE id = ?`,
                    [votedCaksis]
                );
            }
    
            if (votedCawaksis) {
                console.log(votedCawaksis)
                await connection.query<OkPacket>(
                    `UPDATE calon SET total = total - 1 WHERE id = ?`,
                    [votedCawaksis]
                );
            }
            const [result] = await connection.query<ResultSetHeader>(
                `DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = ?`,
                [id]
            );
    
            await connection.commit();
            return result;
        } catch (err) {
            await connection.rollback();
            console.error("Error deleting vote:", err);
            throw err;
        } finally {
            connection.release();
        }
    }
    
    public async checkUserVote(userId: number): Promise<RowDataPacket[]> {
        try {
            const query = `SELECT voted_caksis, voted_cawaksis FROM ${this.tableName} WHERE user_id = ? limit 1`;
            const [results] = await this.client.query(query, [userId]);
            return results as RowDataPacket[];
        } catch (err) {
            console.error("Error fetching user vote:", err);
            throw err;
        }
    }
 
}

export default VotedModel;
