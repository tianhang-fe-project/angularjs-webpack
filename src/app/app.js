import angular from 'angular';
import AppComponent from './app.component.js';
import luegg from 'angularjs-scroll-glue';
import uiRouter from 'angular-ui-router';
import appRouter from './router/router';
// import { LoginService } from './service/login.service';
import loginService from './service/login.service';

import components from './components/components';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['luegg.directives', uiRouter, appRouter.name, components.name])
  .component('app', AppComponent)
  // .service('loginSerivce', loginService)
  // .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;