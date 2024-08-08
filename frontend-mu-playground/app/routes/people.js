import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Ember from 'ember';

export default class PeopleRoute extends Route {
  @service store;

  model() {
    const mapFriendStatistics = async ([ index, value ]) => {
      if (!value) {
        return [index, null];
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

    return Ember.RSVP.hash({
      people: this.store.findAll('person'),
      statistics: (async () => {
        const response = await (await fetch('/friends/statistics')).json();

        return Object.fromEntries(
          await Promise.all(Object.entries(response).map(mapFriendStatistics)),
        );
      })(),
    });
  }
}
