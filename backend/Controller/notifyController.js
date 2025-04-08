const Project = require('../Models/Project');
const User = require('../Models/User');
const mongoose = require('mongoose');

    const requestNotify = async (req, res) => {
        const { projectId, userId, username, teamLeadId, projectName, role } = req.body;
    
        try {
        const teamLead = await User.findById(teamLeadId);
        if (!teamLead) {
            return res.status(404).json({ message: "Team Lead not found" });
        }
        const notification = {
            type: "join-request",
            projectName,
            projectId,
            userId,
            username,
            role,
            timestamp: new Date()
        };
        if (!teamLead.notifications) {
            teamLead.notifications = [];
        }
        teamLead.notifications.push(notification);
        await teamLead.save();
        res.status(200).json({ message: "Notification sent successfully" });
        } catch (err) {
        console.error("Error in requestNotify:", err);
        res.status(500).json({ message: "Internal Server Error" });
        }
    };

    const fetchNotifications= async (req, res) => {
        const userId = req.params.userId;
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user.notifications);
        } catch (err) {
            console.error("Error in getNotifications:", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };

const acceptNotify = async (req, res) => {
}
 
const RejectNotify = async (req, res) => {
}

module.exports = { requestNotify, acceptNotify, RejectNotify, fetchNotifications };