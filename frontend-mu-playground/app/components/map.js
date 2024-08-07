import Component from '@glimmer/component';

const MAP_IMG =
  'https://tile.loc.gov/image-services/iiif/service:gmd:gmd5:g5700:g5700:ct001356/full/pct:25/0/default.jpg';

export default class MapComponent extends Component {
  get src() {
    let { height, width } = this.args;

    return `${MAP_IMG}?token=${this.token}&height=${height}&width=${width}`;
  }

  get token() {
    return 'XXX';
  }
}
