import Component from '@glimmer/component';
import ApplicationAdapter from '../adapters/application';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class FriendStatisticsComponent extends Component {
  @service store;

  @tracked statistics = {};

  constructor() {
    super(...arguments);

    ApplicationAdapter.registerUpdateObserver(() => this.reloadStatistics());
    this.reloadStatistics();
  }

  async reloadStatistics() {
    // Temporary workaround - timeout to wait for the update to happen
    setTimeout(async () => {
      const response = await (await fetch('/friends/statistics')).json();

      this.statistics = Object.fromEntries(
        await Promise.all(Object.entries(response).map((el) => this.mapFriendStatistics(el))),
      );
    }, 300);
  }

  async mapFriendStatistics([ index, value ]) {
    if (!value) {
      return [ index, null ];
    }

    const { friendCount, personId } = value;

    return [
      index,
      {
        friends: parseInt(friendCount.value),
        person: await this.store.findRecord('person', personId.value),
      },
    ];
  };
}
