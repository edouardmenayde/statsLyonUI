import {DataMapMetadata} from '../datamap-metadata';

export function parentLayer(parentLayerName) {
  return function (target) {
    DataMapMetadata.forTarget(target).set('parent-layer', parentLayerName);
  }
}
