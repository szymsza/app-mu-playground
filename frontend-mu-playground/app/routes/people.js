import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Ember from 'ember';

export default class PeopleRoute extends Route {
  @service store;

  model() {
    return this.store.findAll('person');
  }
}
