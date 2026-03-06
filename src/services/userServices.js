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

    claimCapitalIncome: async (body) => {
        const response = await api.post('/withdraw-capital', body);
        return response.data;
    },
    invest: async (body) => {
        const response = await api.post('/invest', body);
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
}

export default userServices;