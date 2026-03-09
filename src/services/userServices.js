import api from "../utils/axios";

const userServices = {
    registerReferral: async (body) => {
        const response = await api.post('/register', body);
        return response.data;
    },
    getVaultSummary: async () => {
        const response = await api.get('/summary', { requiresAuth: true });
        return response.data;
    },
    claimIncome: async (body) => {
        const response = await api.post('/withdraw-income', body);
        return response.data;
    },
    getCycleNumber: async () => {
        const response = await api.get('/cycles', { requiresAuth: true });
        return response.data;
    },
    simulateInvestment: async ({ amount, useOneDayCycle }) => {
        const response = await api.get('/simulate-investment', {
            requiresAuth: true,
            params: { amount: Number(amount), useOneDayCycle: Boolean(useOneDayCycle) },
        });
        return response.data;
    },
    claimCapitalIncome: async (body) => {
        const response = await api.post('/withdraw-capital', body);
        return response.data;
    },
    approveUsdt: async (body) => {
        const response = await api.post('/approve-usdt', body);
        return response.data;
    },
    invest: async (body) => {
        const response = await api.post('/invest', body);
        return response.data;
    },
    reinvest: async (body) => {
        const response = await api.post('/reinvest', body);
        return response.data;
    },
    poolLiquidity: async () => {
        const response = await api.get('/pool-liquidity');
        return response.data;
    },
    poolPositiveValue: async () => {
        const response = await api.get('/pool-position-value');
        return response.data;
    },
    transactionHistory: async (fromBlock = 0, toBlock = 0, limit = 50) => {
        const response = await api.get(`/transaction-history?fromBlock=&toBlock=&limit=${limit}`, { requiresAuth: true });
        return response.data;
    },
    getRoi: async () => {
        const response = await api.get('/roi', { requiresAuth: true });
        return response.data;
    },
    getGlobalPool: async () => {
        const response = await api.get('/global-pool');
        return response.data;
    },
    claimGlobalRank6: async () => {
        const response = await api.post('/claim-global-rank6', {}, { requiresAuth: true });
        return response.data;
    },
}

export default userServices;