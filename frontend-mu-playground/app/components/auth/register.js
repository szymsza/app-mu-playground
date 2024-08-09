import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RegisterComponent extends Component {
  @tracked nickname = '';
  @tracked password = '';
  @tracked passwordConfirmation = '';

  @action
  async register(event) {
    event.preventDefault();

    const response = await (
      await fetch('/accounts', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            type: 'accounts',
            attributes: {
              name: this.nickname,
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

    this.nickname = this.password = this.passwordConfirmation = '';
    alert('Registration successful');
  }
}
