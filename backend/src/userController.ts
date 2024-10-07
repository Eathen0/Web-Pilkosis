import express, { Request, Response } from "express";
import AdminMiddleware from '../Middleware/AdminMiddleware';
import UserModel from "../Models/User";
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';

const router = express.Router();
const user = new UserModel();


interface Siswa {
    id?: number; 
    nama: string;
    paswd: string;
    pilihan?: number | null;
    role_user?: 'admin' | 'user' | 'khusus' | null;
    ayah?: string | null;
    ibu?: string | null;
    nis: string;
}

const upload = multer({ dest: 'uploads/' }); 

router.post('/siswa', AdminMiddleware, upload.single('file'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'CSV file is required' });
        }

        const filePath = req.file.path;
        const siswaData: any[] = [];

        // Baca file CSV dan proses baris per baris
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const { nama, paswd, pilihan, role_user, ayah, ibu, nis } = row;
                siswaData.push({ nama, paswd, pilihan, role_user, ayah, ibu, nis });
            })
            .on('end', async () => {
                // Simpan data siswa ke database
                try {
                    const insertResult = await user.insertMany(siswaData); // Menggunakan insertMany untuk menyimpan banyak data
                    return res.status(201).json({
                        message: 'Siswa created successfully',
                        data: insertResult,
                    });
                } catch (err: any) {
                    return res.status(500).json({
                        message: 'Failed to insert siswa data',
                        error: err.message,
                    });
                } finally {
                    // Hapus file setelah diproses
                    fs.unlinkSync(filePath);
                }
            })
            .on('error', (err) => {
                return res.status(500).json({
                    message: 'Error processing CSV file',
                    error: err.message,
                });
            });
    } catch (err: any) {
        return res.status(500).json({
            message: 'Failed to create siswa',
            error: err.message,
        });
    }
});


router.get('/siswa', async (req: Request, res: Response) => {
    try {
        const allSiswa = await user.All() as Siswa[];
        
        return res.status(200).json({
            message: 'Success',
            data: allSiswa
        });
    } catch (err: any) {
        return res.status(500).json({
            message: 'Failed to retrieve siswa data',
            error: err.message
        });
    }
});

router.get('/siswa/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    try {
        const siswa = await user.FindByID(id) as Siswa | null;

        if (!siswa) {
            return res.status(404).json({ message: 'Siswa not found' });
        }

        return res.status(200).json({
            message: 'Success',
            data: siswa
        });
    } catch (err: any) {
        return res.status(500).json({
            message: 'Failed to retrieve siswa',
            error: err.message
        });
    }
});

router.put('/siswa/:id', AdminMiddleware, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { nama, paswd, pilihan, role_user, ayah, ibu, nis } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    try {
        const updateData: Partial<Siswa> = { nama, paswd, pilihan, role_user, ayah, ibu, nis };
        const result = await user.updateById(id, updateData);

        if (!result) {
            return res.status(404).json({ message: 'Siswa not found' });
        }

        return res.status(200).json({
            message: 'Siswa updated successfully',
            data: result
        });
    } catch (err: any) {
        return res.status(500).json({
            message: 'Failed to update siswa',
            error: err.message
        });
    }
});

router.delete('/siswa/:id', AdminMiddleware, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    try {
        const result = await user.dropById(id);

        if (!result) {
            return res.status(404).json({ message: 'Siswa not found' });
        }

        return res.status(200).json({ message: 'Siswa deleted successfully' });
    } catch (err: any) {
        return res.status(500).json({
            message: 'Failed to delete siswa',
            error: err.message
        });
    }
});

export default router;
