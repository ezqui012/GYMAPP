import * as dashboardModel from './dashboard.model.js'

export const getDashboardStats=async()=>{
    const stats = await dashboardModel.getDashboardStats();
    if(!stats)throw new Error("Error Fetching data");
    return stats;
}

export const getExpiredMemberships = async()=>{
    const expiredMemberships = await dashboardModel.getExpiredMemberships();
    if(!expiredMemberships)throw new Error("Error Fetching data");
    return expiredMemberships;
}

export const getExpiringMemberships=async()=>{
    const expiringMemberships = await dashboardModel.getExpiringMemberships();
    if(!expiringMemberships)throw new Error("Error Fetching data");
    return expiringMemberships;
}