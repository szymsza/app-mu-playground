import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class LoginComponent extends Component {
  @tracked nickname = '';
  @tracked password = '';

  @service session;

  @action
  async login(event) {
    event.preventDefault();

    try {
      await this.session.authenticate('authenticator:mu-semtech', {
        nickname: this.nickname,
        password: this.password,
      });
      alert('Login successful');
    } catch (e) {
      if (e.errors) {
        e.errors.forEach(({ title }) => {
          alert(title);
        });
        return;
      }
    }

    this.nickname = this.password = '';
  }
}
