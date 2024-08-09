import Model, { attr, hasMany } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr('string') name;
  @attr('number') age;
  @attr('avatar', {
    defaultValue:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuoiVnnWu_QbtFist_W7Hbz2V4drhwXDVyiw&s',
  }) avatar;

  @hasMany('person', {
    inverse: 'friendof',
    async: true,
  }) friends;

  @hasMany('person', {
    inverse: 'friends',
    async: true,
  }) friendof;

  get slug() {
    // Source: https://dev.to/bybydev/how-to-slugify-a-string-in-javascript-4o9n
    return this.name.replace(/^\s+|\s+$/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
}
