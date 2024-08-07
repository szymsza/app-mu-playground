import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PeopleController extends Controller {
  @tracked newName = '';
  @tracked newAge = '';

  @tracked newFriendSubject = '';
  @tracked newFriendObject = '';

  @service store;

  @action
  createPerson(event) {
    event.preventDefault();
    // create the new perfon
    const person = this.store.createRecord('person', {
      name: this.newName,
      age: this.newAge,
    });
    person.save();
    // clear the input fields
    this.newName = '';
    this.newAge = '';
  }

  @action
  removePerson(person, event) {
    event.preventDefault();
    person.destroyRecord();
  }

  @action
  async createFriendship(event) {
    event.preventDefault();

    const subject = await this.store.findRecord('person', this.newFriendSubject);
    const object = await this.store.findRecord('person', this.newFriendObject);
    const friends = await subject.friends;
    friends.push(object);
    subject.save();
  }

  get selectOptions() {
    return this.get('model').map((person) => ({
      value: person.id,
      label: person.name,
    }));
  }
}
