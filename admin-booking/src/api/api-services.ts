import baseAxios from "../config/axios-config";
import { Room } from "../type/type";

class ApiService {
  async post(endpoint: string, data: any): Promise<any> {
    return await baseAxios.post(endpoint, data);
  }
  async getById(endpoint: string, id: number): Promise<any> {
    return await baseAxios.get(`${endpoint}/${id}`);
  }
  async get(endpoint: string): Promise<any> {
    return await baseAxios.get(`${endpoint}`);
  }
  async patch(id: number, keyRoom: any, endpoint: string): Promise<any> {
    return await baseAxios.patch(`${endpoint}/${id}`, keyRoom);
  }
  async put(id: number, endpoint: string, dataRoom: Room): Promise<any> {
    return await baseAxios.put(`${endpoint}/${id}`, dataRoom);
  }
  async getByCondition(endpoint: string, value: any, key: any) {
    return await baseAxios.get(`${endpoint}?${key}=${value}`);
  }
  async delete(endpoint: string, id: number): Promise<any> {
    return await baseAxios.delete(`${endpoint}/${id}`);
  }
  async uploadRoom(formData: any, endpoint: string) {
    return await baseAxios.patch(`${endpoint}`, formData);
  }
}
export default ApiService;
