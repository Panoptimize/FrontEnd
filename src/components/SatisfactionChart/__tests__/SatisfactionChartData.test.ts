import axios from 'axios';
import { fetchJsonData } from '../SatisfactionChartData';

jest.mock('axios');

describe('fetchJsonData', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch JSON data successfully', async () => {
        const mockData = { key: 'value' };
        const mockResponse = { status: 200, data: mockData };
        (axios.get as jest.Mock).mockResolvedValue(mockResponse);

        const result = await fetchJsonData();

        expect(result).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8080/dashboard/customer-satisfaction');
    });


    it('should throw an error if an error occurs during the request', async () => {
        const mockError = new Error('Network error');
        (axios.get as jest.Mock).mockRejectedValue(mockError);

        await expect(fetchJsonData()).rejects.toThrowError('Error fetching data');
        expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8080/dashboard/customer-satisfaction');
    });

});