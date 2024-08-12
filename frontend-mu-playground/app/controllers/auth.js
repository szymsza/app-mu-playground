import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthController extends Controller {
  @service session;
  @service store;

  @tracked
  person = null;

  constructor() {
    super(...arguments);

    this.loadUser();
  }

  async loadUser() {
    if (!this.session.isAuthenticated) {
      return null;
    }

    const account = await this.store.findRecord(
      'account',
      this.session.data.authenticated.data.relationships.account.data.id,
    );

    this.person = await account.owner;
  }
}
