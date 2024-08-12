import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class SearchComponent extends Component {
  @tracked query = '';

  @service store;

  @action
  async search() {
    const query = this.query.trim();
    const callback = this.args.onSearch;

    if (query === '') {
      callback(null);
      return;
    }

    const results = await (
      await fetch(`/search/people/search?filter[:wildcard:name]=*${query}*`)
    ).json();

    if (results.count === 0) {
      callback([]);
      return;
    }

    callback(results.data.map((x) => this.store.peekRecord('person', x.id)));
  }
}
