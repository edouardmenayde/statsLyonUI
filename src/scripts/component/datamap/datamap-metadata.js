import {metadata} from 'aurelia-metadata';

export class DataMapMetadata {
  static forTarget(target) {
    return metadata.getOrCreateOwn(Metadata.key, Metadata, target, target.name);
  }
}

export class Metadata {
  static key = 'stats-lyon:datamap:metadata';

  constructor() {
    this.metadata = {
      sublayers: []
    }
  }

  addTo(key, value) {
    if (typeof this.metadata[key] === 'undefined') {
      this.metadata[key] = [];
    }
    else if (!Array.isArray(this.metadata[key])) {
      this.metadata[key] = [this.metadata[key]];
    }

    this.metadata[key].push(value);

    return this;
  }

  has(key) {
    return typeof this.metadata[key] !== 'undefined';
  }

  fetch(key) {
    return this.has(key) ? this.metadata[key] : null;
  }

}
