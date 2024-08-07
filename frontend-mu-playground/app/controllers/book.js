import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class BookController extends Controller {
  @tracked newTitle = '';
  @tracked newIsbn = '';

  @service store;

  @action
  createBook(event) {
    event.preventDefault();
    // create the new book
    const book = this.store.createRecord('book', {
      title: this.newTitle,
      isbn: this.newIsbn,
    });
    book.save();
    // clear the input fields
    this.newTitle = '';
    this.newIsbn = '';
  }

  @action
  removeBook(book, event) {
    event.preventDefault();
    book.destroyRecord();
  }
}
