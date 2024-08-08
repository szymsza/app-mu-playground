import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PersonController extends Controller {
  @service router;
  @service store;

  @tracked edit = false;
  @tracked stealToId = '';
  @tracked selectOptions = [];

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

  constructor() {
    super(...arguments);

    this.store.findAll('person').then((x) => {
      this.selectOptions = x.map((person) => ({
        value: person.id,
        label: person.name,
      }));
    });
  }

  @action
  async steal(from, event) {
    event.preventDefault();

    const stealRequest = await fetch(`/friends/steal/${from.id}/${this.stealToId}`);
    const stealResult = await stealRequest.json();

    if (stealResult['callret-0']?.value) {
      alert(`${parseInt(stealResult['callret-0']?.value.split('insert')[1])} friends stolen!`);
    }

    this.store.unloadAll('person');
    this.router.refresh();
  }
}
