import { RowDataPacket } from "mysql2/promise";
import BaseModel from "./Main/BaseModels";

// Interface Siswa (optional, bisa gunakan jika sudah dideklarasikan sebelumnya)
interface Siswa {
    id: number;
    nama: string;
    paswd: string;
    pilihan?: number | null;
    role_user?: 'admin' | 'user' | 'khusus' | null;
    ayah?: string | null;
    ibu?: string | null;
    nis: string;
}

class UserModel extends BaseModel {
    protected tableName: string = "siswa";
    protected primaryKey: string = "id";
    db: any;

    public async addUser(user: Siswa): Promise<RowDataPacket[]> {
        try {
            const query = `INSERT INTO ${this.tableName} 
                (id, nama, paswd, pilihan, role_user, ayah, ibu, nis) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

            const values = [
                user.id,
                user.nama,
                user.paswd,
                user.pilihan || null,
                user.role_user || null,
                user.ayah || null,
                user.ibu || null,
                user.nis
            ];

            const result = await this.db.query(query, values);
            return result[0]; 
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    }
}

export default UserModel;
