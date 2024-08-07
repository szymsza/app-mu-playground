import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class PersonRoute extends Route {
  @service store;

  async model(params) {
    return this.store.findRecord('person', params.person_id);
  }
}
