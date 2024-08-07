import Model, { attr, hasMany } from '@ember-data/model';

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
}
