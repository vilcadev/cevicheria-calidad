import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Dishes } from 'src/app/demo/interfaces/dishe.interface';

@Injectable({
  providedIn: 'root'
})
export class DueniaService {



  async getDishes(){
  // you can also fetch all records at once via getFullList
    const pb = new PocketBase('http://127.0.0.1:8090');
    const dishes:Dishes[] = await pb.collection('platillos').getFullList({
      sort: '-created',
  });
  return dishes;
    };



  async addDishe(data: Dishes){
    const pb = new PocketBase('http://127.0.0.1:8090');

    const response = await pb.collection('platillos').create(data);

    return response;
  };

  async getOneDishe(disheId: string){
    const pb = new PocketBase('http://127.0.0.1:8090');

    const dishe: Dishes = await pb.collection('platillos').getOne(disheId);

    return dishe;
  }

  async updateDishe(data: Dishes){
    const pb = new PocketBase('http://127.0.0.1:8090');

    const response = await pb.collection('platillos').update(data.id,data)
    return response;

  }

  async deleteDishe(disheId: string){
    const pb = new PocketBase('http://127.0.0.1:8090');
    const response = await pb.collection('platillos').delete(disheId);
    return response;

  }

  constructor() { }

  // https://stackblitz.com/edit/f1xdm1?file=src%2Fexample%2Fautocomplete-require-selection-example.ts
}
