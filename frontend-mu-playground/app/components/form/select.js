import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class CustomInputComponent extends Component {

  @action
  updateValue(event) {
    this.args.onChange(event.target.value);
  }

  constructor(...args) {
    super(...args);

    // TODO - remove the temporary workaround for setting the initial value
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
