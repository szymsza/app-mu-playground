import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class LogoutComponent extends Component {
  @service session;

  @action
  async logout(event) {
    event.preventDefault();
    await this.session.invalidate('mu-semtech');
    alert('Logout successful');
  }
}
