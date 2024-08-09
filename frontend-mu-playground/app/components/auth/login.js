import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LoginComponent extends Component {
  @tracked nickname = '';
  @tracked password = '';

  @action
  async login(event) {
    event.preventDefault();

    const response = await (
      await fetch('/sessions', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            type: 'sessions',
            attributes: {
              nickname: this.nickname,
              password: this.password,
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

    this.nickname = this.password = '';
    alert('Login successful');
  }
}
