import {InjectionToken} from '@angular/core';

import {IAppConfig} from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: IAppConfig = {
  routes: {
    heroes: 'heroes',
    transactions: 'transaction',
    error404: '404'
  },
  endpoints: {
    heroes: 'https://nodejs-example-app.herokuapp.com/heroes',
    transactions: 'transaction',
    category: 'category',
    payee: 'payee',
    fileupload: 'http://localhost:3000/api/upload',
    masters: 'http://localhost:3000/api/masters'
  },
  votesLimit: 3,
  topHeroesLimit: 4,
  snackBarDuration: 3000,
  repositoryURL: 'https://github.com/Ismaestro/angular5-example-app',
  apiURL: 'http://localhost:3000/api',
  documentURL: 'http://localhost:3000/',
};
