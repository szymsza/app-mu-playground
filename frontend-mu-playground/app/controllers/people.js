import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PeopleController extends Controller {
  @tracked newName = '';
  @tracked newAge = '';

  @tracked newFriendSubjectId = '';
  @tracked newFriendObjectId = '';

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

    const subject = await this.store.findRecord('person', this.newFriendSubjectId);
    const object = await this.store.findRecord('person', this.newFriendObjectId);
    const friends = await subject.friends;

    // This friendship already exists
    if (friends.find((friend) => friend.id === object.id)) {
      alert('Relatinship already exists!');
      return;
    }

    friends.push(object);
    subject.save();
    alert('Relatinship successfully added!');
  }

  get selectOptions() {
    return this.get('model').people.map((person) => ({
      value: person.id,
      label: person.name,
    }));
  }
}
