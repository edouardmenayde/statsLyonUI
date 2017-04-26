import {DataMapMetadata} from '../datamap-metadata';

export function sublayer (subLayerName) {
  return function (target) {
    DataMapMetadata.forTarget(target).addTo('sublayers', subLayerName);
  }
}
