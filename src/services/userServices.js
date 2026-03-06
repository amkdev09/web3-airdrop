import api from "../utils/axios";

const userServices = {
    getVaultSummary: async () => {
        const response = await api.get('/summary');
        return response.data;
    },
    claimIncome: async () => {
        const response = await api.post('/withdraw-income');
        return response.data;
    },
    /**
     * @param {number} [cycleIndex=0] - Cycle index from /vault/cycles (0-based)
     */
    claimCapitalIncome: async (cycleIndex = 0) => {
        const response = await api.post('/withdraw-capital', { cycleIndex });
        return response.data;
    },
    invest: async (body) => {
        const response = await api.post('/invest', body);
        return response.data;
    },
}

export default userServices;