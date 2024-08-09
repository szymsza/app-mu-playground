export default class AvatarTransform {
  deserialize(serialized) {
    return `${serialized}/download`;
  }

  serialize(deserialized) {
    return deserialized;
  }

  static create() {
    return new this();
  }
}
