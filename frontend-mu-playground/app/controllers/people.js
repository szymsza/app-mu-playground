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
  createFriendship(event) {
    event.preventDefault();

    // TODO
    console.log("Making ", this.newFriendSubject, " friends with ", this.newFriendObject);
  }

  get selectOptions() {
    return this.get('model').map((person) => ({
      value: person.id,
      label: person.name,
    }));
  }
}
