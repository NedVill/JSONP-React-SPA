import fetchJson from '../utils/utils';
import Message from '../components/Message/Message';
import { IFetch } from '../Interfaces/Interfaces';

export default class ApiService {
  private apiBaseUrl: string = 'https://jsonplaceholder.typicode.com';

  private message: Message = new Message();

  private returnResponse = (response: IFetch, type: string, doneText?: string): [] => {
    if (!response.ok) {
      this.message.error(`Error ${type}! Code: ${response.status}`);

      return [];
    }

    if (doneText) {
      this.message.success(`${type} ${doneText}`);
    }

    return response.json();
  };

  public getItems = async <T>(url: string, type: string = 'item'): Promise<T[]> => {
    const response: IFetch = await fetchJson(`${this.apiBaseUrl}/${url}`, { method: 'GET' });

    return this.returnResponse(response, type);
  };

  public deleteItem = async <T>(url: string, type: string = 'item'): Promise<T[]> => {
    const response = await fetchJson(`${this.apiBaseUrl}/${url}`, { method: 'DELETE' });

    return this.returnResponse(response, type, 'was deleted!');
  };

  public addItem = async <T, D>(url: string, type: string = 'item', data: D): Promise<T[]> => {
    const config = {
      method: 'POST',
      body: JSON.stringify(data),
    };

    const response = await fetchJson(`${this.apiBaseUrl}/${url}`, config);

    return this.returnResponse(response, type, 'added!');
  };

  public updateItem = async <T, D>(url: string, type: string = 'item', data: D): Promise<T[]> => {
    const config = {
      method: 'PUT',
      body: JSON.stringify(data),
    };

    const response = await fetchJson(`${this.apiBaseUrl}/${url}`, config);

    return this.returnResponse(response, type, 'updated!');
  };
}
