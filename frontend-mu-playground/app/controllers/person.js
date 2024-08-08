import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PersonController extends Controller {
  @service router;

  @tracked edit = false;

  @action
  async removePerson(person, event) {
    event.preventDefault();
    await person.destroyRecord();
    this.router.transitionTo('people');
  }

  @action
  async removeFriend(subject, object, event) {
    event.preventDefault();
    const friends = await subject.friends;
    subject.friends = friends.filter((friend) => friend.id !== object.id);
    subject.save();
  }

  @action
  async removeFriendOf(object, subject, event) {
    return this.removeFriend(subject, object, event);
  }

  @action
  toggleEdit() {
    this.edit = !this.edit;
  }

  @action
  saveEdit(person) {
    person.save();
    this.edit = !this.edit;
  }
}
