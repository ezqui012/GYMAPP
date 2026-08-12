import * as dashboardService from './dashboard.service.js'

export const getDashboardStats=async(req, res)=>{
    try {
        const stats = await dashboardService.getDashboardStats();
        res.status(200).json(stats)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getExpiredMemberships = async(req, res)=>{
    try {
        const expiredMemberships = await dashboardService.getExpiredMemberships();
        res.status(200).json(expiredMemberships)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getExpiringMemberships = async(req, res)=>{
    try {
        const expiringMemberships = await dashboardService.getExpiringMemberships();
        res.status(200).json(expiringMemberships);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}