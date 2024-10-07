import express, { Router, Response } from "express";
import PaslonModel from "../Models/PaslonModel";
import VotedModel from "../Models/VotedModel";
import AuthorizationMiddleware, { CustomRequest } from "../Middleware/AuthorizationMiddleware";
import RoleMiddleware from '../Middleware/RoleMiddleware';

import cookieParser from 'cookie-parser';

const votedModel = new VotedModel();
const router = express.Router();
router.use(cookieParser());

let votingDeadline: Date | null = null; 


router.post("/vote", AuthorizationMiddleware, async (req: CustomRequest, res: Response) => {
    const now = new Date();

    if (votingDeadline && now > votingDeadline) {
        return res.status(400).json({
            message: "Voting has ended"
        });
    }

    const paslonId = Number(req.query.id); 
    const userId = Number(req.user?.id);
    const voteType = req.query.type as string;  

    if (!userId || isNaN(paslonId) || !voteType) {
        return res.status(400).json({
            message: "Invalid ID, vote type, or user not authenticated"
        });
    }

    try {
        const existingVote = await votedModel.Find({ user_id: userId });
        if (existingVote.length > 0) {
            let hasVoted = false;
            const currentVote = existingVote[0];

            if (voteType === 'caksis') {
                hasVoted = currentVote.voted_caksis !== null;
            } else if (voteType === 'cawaksis') {
                hasVoted = currentVote.voted_cawaksis !== null;
            }

            if (hasVoted) {
                return res.status(400).json({
                    message: `User has already voted for ${voteType}`
                });
            }
        }

        let updateData: any = {};
        if (voteType === 'caksis') {
            updateData = { voted_caksis: paslonId };
        } else if (voteType === 'cawaksis') {
            updateData = { voted_cawaksis: paslonId };
        }

        if (existingVote.length > 0) {
            await votedModel.update(updateData, userId);
        } else {
            await votedModel.insert({ user_id: userId, ...updateData });
        }

        await votedModel.updateTotalInCalon(paslonId);

        return res.status(200).json({
            message: `Vote for ${voteType} cast successfully`
        });
    } catch (err: any) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});

router.get("/voted", [AuthorizationMiddleware, RoleMiddleware(['admin', 'khusus','user'])], async (req: CustomRequest, res: Response) => {
    try {
        const votes = await votedModel.getAllVotes();
        const totalVotes = await votedModel.countVotes();

        return res.status(200).json({
            message: "Success",
            data: votes,
            totalVotes: totalVotes
        });
    } catch (err: any) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }

});
router.delete("/voted", [AuthorizationMiddleware, RoleMiddleware(['admin', 'khusus'])], async (req: CustomRequest, res: Response) => {
    try {
        console.log('endpoint hitted');
        const voteId = parseInt(String(req.query.id || '-1'), 10); 

        if (isNaN(voteId)) {
            return res.status(400).json({
                message: "Invalid vote ID"
            });
        }

        const deletedVote = await votedModel.deleteVoteById(voteId);

        if (deletedVote.affectedRows > 0) {
            return res.status(200).json({
                message: "Vote deleted successfully"
            });
        } else {
            return res.status(404).json({
                message: "Vote not found"
            });
        }
    } catch (err: any) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});



router.get('/checkUserVote', AuthorizationMiddleware, async (req: CustomRequest, res: Response) => {
    const userId = Number(req.user?.id);

    if (!userId) {
        return res.status(400).json({
            message: "User not authenticated"
        });
    }

    try {
        const userVote = await votedModel.checkUserVote(userId);
        return res.status(200).json({
            message: "Success",
            data: userVote.length != 0 ? userVote[0] : {voted_caksis: undefined, voted_cawaksis: undefined}
        });
    } catch (err: any) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});
router.post("/setDeadline", [AuthorizationMiddleware, RoleMiddleware(['admin'])], (req: CustomRequest, res: Response) => {
    const { deadline } = req.body; 

    
    votingDeadline = new Date(deadline);
    
    return res.status(200).json({ message: 'Voting deadline updated', deadline: votingDeadline });
});

export default router;
