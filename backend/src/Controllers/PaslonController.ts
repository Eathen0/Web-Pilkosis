import express, { Request, Response } from 'express';
import uploadMiddleware from '../Middleware/UploadMiddleware';
import AdminMiddleware from '../Middleware/AdminMiddleware';
import PaslonModel from '../Models/PaslonModel';

const app = express();
const paslon = new PaslonModel();

interface PaslonData {
    id?: number;
    nomor_urut: string;
    nama: string;
    kelas: string;
    ttl: string;
    motto: string;
    alamat: string;
    calon_jabatan: string;
    visi: string;
    misi: string;
    program_kerja: string;
    img: string;
    total?: number;
}


const router = express.Router();


router.post('/calon', [AdminMiddleware, uploadMiddleware.single('img')], async (req: Request, res: Response) => {
    const { nomor_urut, nama, kelas, ttl, motto, alamat, calon_jabatan, visi, misi, program_kerja } = req.body;
    const img = req.file?.filename;

    if (!img) {
        return res.status(400).json({ message: 'Image file is required' });
    }

    try {
        const insertResult = await paslon.insert({
            nomor_urut, nama, kelas, ttl, motto, alamat, calon_jabatan, visi, misi, program_kerja, img
        }) as PaslonData;

        res.status(200).json({
            message: 'success',
            data: insertResult
        });
    } catch (err: any) {
        res.status(500).json({
            message: 'Failed to insert data',
            error: err.message
        });
    }
});


router.get('/caksis', async (req: Request, res: Response) => {
    try {
        const allPaslons = await paslon.All() as PaslonData[];
        const filteredPaslons = allPaslons.filter(paslon => paslon.calon_jabatan === 'caksis');

        return res.status(200).json({
            message: 'success',
            data: filteredPaslons
        });
    } catch (err: any) {
        return res.status(500).json({
            message: 'Failed to retrieve paslon data',
            error: err.message
        });
    }
});


router.get('/cawaksis', async (req: Request, res: Response) => {
    try {
        const allPaslons = await paslon.All() as PaslonData[];
        const filteredPaslons = allPaslons.filter(paslon => paslon.calon_jabatan === 'cawaksis');

        return res.status(200).json({
            message: 'success',
            data: filteredPaslons
        });
    } catch (err: any) {
        return res.status(500).json({
            message: 'Failed to retrieve paslon data',
            error: err.message
        });
    }
});


router.delete('/calon/:id', AdminMiddleware, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    try {
        const result = await paslon.dropById(id) as { affectedRows: number };
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Paslon not found' });
        }

        res.status(200).json({ message: 'Paslon deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ message: 'Failed to delete paslon', error: err.message });
    }
});

router.put('/calon/:id', [AdminMiddleware, uploadMiddleware.single('img')], async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    const { nomor_urut, nama, kelas, ttl, motto, alamat, calon_jabatan, visi, misi, program_kerja } = req.body;
    let img = req.file?.filename;

    try {
        
        if (!img) {
            const existingPaslon = await paslon.FindByID(id) as PaslonData[];
            if (existingPaslon.length > 0) {
                img = existingPaslon[0].img;
            }
        }

        const updateResult = await paslon.updateById(id, {
            nomor_urut, nama, kelas, ttl, motto, alamat, calon_jabatan, visi, misi, program_kerja, img
        });

        res.status(200).json({
            message: 'success',
            data: updateResult
        });
    } catch (err: any) {
        res.status(500).json({
            message: 'Failed to update paslon',
            error: err.message
        });
    }
});

export default router;
