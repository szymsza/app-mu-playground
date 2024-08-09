import JSONApi from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONApi {
  createRecord(store, type, snapshot) {
    const request = super.createRecord(store, type, snapshot);
    this.triggerChange();
    return request;
  }

  updateRecord(store, schema, snapshot) {
    const request = super.updateRecord(store, schema, snapshot);
    this.triggerChange();
    return request;
  }

  deleteRecord(store, schema, snapshot) {
    const request = super.deleteRecord(store, schema, snapshot);
    this.triggerChange();
    return request;
  }

  triggerChange() {
    ApplicationAdapter.updateObservers.forEach((fn) => fn());
  }

  static updateObservers = [];

  static registerUpdateObserver(onUpdate) {
    this.updateObservers.push(onUpdate);
  }
}
