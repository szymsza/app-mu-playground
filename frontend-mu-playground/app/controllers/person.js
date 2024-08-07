import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PersonController extends Controller {
  @service router;

  @action
  async removePerson(person, event) {
    event.preventDefault();
    await person.destroyRecord();
    this.router.transitionTo('people');
  }
}
