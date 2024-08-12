import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class PersonController extends Controller {
  @service router;
  @service store;
  @service session;

  @tracked edit = false;
  @tracked stealToId = '';
  @tracked selectOptions = [];
  @tracked authenticated = false;

  @action
  async removePerson(person, event) {
    event.preventDefault();
    await person.destroyRecord();
    this.router.transitionTo('people');
  }

  @action
  async claimPerson(person, event) {
    event.preventDefault();

    const account = await this.store.findRecord(
      'account',
      this.session.data.authenticated.data.relationships.account.data.id,
    );

    account.owner = person;
    person.account = account;
    await account.save();
    await person.save();
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
  async saveEdit(person, event) {
    event.preventDefault();
    await this.uploadImage(person, event.target);

    person.save();
    this.edit = !this.edit;
  }

  async uploadImage(person, form) {
    const formData = new FormData(form);
    if (formData.get('file').size === 0) {
      return;
    }

    const response = await (
      await fetch('/files', {
        method: 'POST',
        body: formData,
      })
    ).json();

    person.avatar = response.links.self;
  }

  constructor() {
    super(...arguments);

    if (!this.session.isAuthenticated) {
      this.loadPeopleSelect();
    } else {
      this.loadAuthUser();
    }
  }

  async loadAuthUser() {
    const account = await this.store.findRecord(
      'account',
      this.session.data.authenticated.data.relationships.account.data.id,
    );

    const owner = await account.owner;

    if (!owner) {
      this.loadPeopleSelect();
      return;
    }

    this.stealToId = owner.id;
    this.authenticated = true;
  }

  async loadPeopleSelect() {
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

    const stealRequest = await fetch(
      `/friends/steal/${from.id}/${this.stealToId}`,
      {
        method: 'POST',
      },
    );
    const stealResult = await stealRequest.json();

    if (stealResult['callret-0']?.value) {
      alert(
        `${parseInt(stealResult['callret-0']?.value.split('insert')[1])} friends stolen!`,
      );
    }

    this.store.unloadAll('person');
    this.router.refresh();
  }
}
