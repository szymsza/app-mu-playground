import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LogoutComponent extends Component {
  @action
  async logout(event) {
    event.preventDefault();

    const response = await fetch('/sessions/current', {
      method: 'DELETE',
    });

    if (response.status === 204) {
      alert('Logout successful');
      return;
    }

    const errors = (await response.json()).errors;

    if (errors) {
      errors.forEach(({ title }) => {
        alert(title);
      });
      return;
    }
    alert('Something went wrong!');
  }
}
