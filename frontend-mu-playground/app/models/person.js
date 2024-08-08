import Model, { attr, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';

export default class BookModel extends Model {
  @attr('string') name;
  @attr('number') age;

  @hasMany('person', {
    inverse: 'friendof',
    async: true,
  }) friends;

  @hasMany('person', {
    inverse: 'friends',
    async: true,
  }) friendof;

  @computed('name')
  get slug() {
    // Source: https://dev.to/bybydev/how-to-slugify-a-string-in-javascript-4o9n
    return this.name.replace(/^\s+|\s+$/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
}
