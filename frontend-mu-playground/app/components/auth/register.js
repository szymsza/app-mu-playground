import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class RegisterComponent extends Component {
  @tracked name = '';
  @tracked age = '';
  @tracked nickname = '';
  @tracked password = '';
  @tracked passwordConfirmation = '';

  @service store;

  @action
  async register(event) {
    event.preventDefault();

    const response = await (
      await fetch('/register', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            type: 'accounts',
            attributes: {
              name: this.name,
              nickname: this.nickname,
              password: this.password,
              'password-confirmation': this.passwordConfirmation,
            },
          },
        }),
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
      })
    ).json();

    if (response.errors) {
      response.errors.forEach(({ title }) => {
        alert(title);
      });
      return;
    }

    const accountPerson = await (
      await this.store.findRecord('account', response.data.id)
    ).owner;
    accountPerson.set('age', this.age);
    await accountPerson.save();

    this.name =
      this.age =
      this.nickname =
      this.password =
      this.passwordConfirmation =
        '';
    alert('Registration successful');
  }
}
