import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class CustomInputComponent extends Component {

  @action
  updateValue(event) {
    this.args.onChange(event.target.value);
  }

  constructor(...args) {
    super(...args);

    // setTimeout just as an ugly workaround for setting a default value
    setTimeout(() => {
      let x;
      if (!this.args.value && (x = this.args.options[0])) {
        this.updateValue({
          target: x,
        });
      }
    }, 50);
  }
}
