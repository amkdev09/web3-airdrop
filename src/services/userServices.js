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
}

export default userServices;