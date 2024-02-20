import baseAxios from "../config/axios-config";
import { Room } from "../type/type";

class ApiService {
  async post(endpoint: string, data: any): Promise<any> {
    try {
      return await baseAxios.post(endpoint, data);
    } catch (error) {
      return error;
    }
  }
  async getById(endpoint: string, id: any): Promise<any> {
    return await baseAxios.get(`${endpoint}/${id}`);
  }
  async get(endpoint: string): Promise<any> {
    try {
      return await baseAxios.get(`${endpoint}`);
    } catch (error) {
      return error;
    }
  }
  async patch(id: number, keyRoom: any, endpoint: string): Promise<any> {
    return await baseAxios.patch(`${endpoint}/${id}`, keyRoom);
  }
  async put(id: number, endpoint: string, dataRoom: Room): Promise<any> {
    return await baseAxios.put(`${endpoint}/${id}`, dataRoom);
  }
  async getByCondition(endpoint: string, value: any, key: any) {
    return await baseAxios.get(`${endpoint}?${value == key}`);
  }
  async delete(endpoint: string, id: number): Promise<any> {
    return baseAxios.delete(`${endpoint}/${id}`);
  }
  async getAllByUser(endpoint: string, idUser: number): Promise<any> {
    return await baseAxios.get(`${endpoint}/${idUser}`);
  }
  async uploadImage(endpoint: string, formData: any, id: number) {
    return await baseAxios.patch(`${endpoint}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  async checkEmail(dataEmail: any, endpoint: string) {
    return await baseAxios.post(`${endpoint}`, dataEmail);
  }
  async checkPin(endpoint: string, valuePin: any) {
    return await baseAxios.post(`${endpoint}`, valuePin);
  }
}
export default ApiService;
