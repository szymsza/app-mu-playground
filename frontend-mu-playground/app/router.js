import EmberRouter from '@ember/routing/router';
import config from 'frontend-mu-playground/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('book');

  this.route('about');
  this.route('contact', { path: '/getting-in-touch' });
  this.route('rental', { path: '/rental/:id' });

  this.route('people');
  this.route('person', { path: '/person/:id' });
  this.route('person', { path: '/person/:slug/:id' });
  this.route('auth');
});
