import {inject} from 'aurelia-framework';
import {DataMapMetadata} from "./datamap-metadata";
import {Endpoint} from "aurelia-api";

@inject(Endpoint.of('api'))
export class LayerManager {

  tree = {};

  Layers = [];

  layers = new Map();

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  populateLayers(canvas) {
    this.Layers.forEach(Layer => {
      let layer = new Layer(this, canvas, this.endpoint);

      this.layers.set(Layer.name, {
        instance : layer,
        parent   : getParent(Layer),
        displayed: true
      });
    });

    this.initializeLayers();
  }

  initializeLayersInOrder(tree) {
    Reflect.ownKeys(tree).forEach(layerName => {
      let layer = this.layers.get(layerName);

      if (layer && layer.displayed) {
        layer.instance.doInitialize();
        this.initializeLayersInOrder(tree[layerName]);
      }
    });
  }

  initializeLayers() {
    this.initializeLayersInOrder(this.tree);
  }

  reloadAllLayersInOrder(tree) {
    Reflect.ownKeys(tree).forEach(layerName => {
      let layer = this.layers.get(layerName);

      if (layer) {
        if (layer.displayed) {
          layer.instance.clear();
          layer.instance.reload();
        }
        else {
          layer.instance.clear();
        }
        this.reloadAllLayersInOrder(tree[layerName]);
      }
    });
  }

  reloadAllLayers() {
    this.reloadAllLayersInOrder(this.tree);
  }

  getParent(layer) {
    const parent = this.layers.get(layer.constructor.name).parent;

    return this.layers.get(parent).instance;
  }

  toggleLayer(layerName) {
    let layer = this.layers.get(layerName);

    if (layer) {
      layer.displayed = !layer.displayed;

      this.reloadAllLayers();
    }
  }

  registerLayers(Layers) {
    this.Layers = Layers;

    let layers = {};

    Layers.forEach(Layer => {
      layers[Layer.name] = {
        parent: getParent(Layer)
      }
    });

    this.generateTree(layers);
  }

  fetchTree() {
    return this.tree;
  }

  generateTree(layers) {
    let layerKeys = Reflect.ownKeys(layers);

    layerKeys.forEach(layerName => {
      if (layers[layerName].parent) {
        layerKeys.forEach(l => {
          if (l === layers[layerName].parent) {
            layers[l][layerName] = layers[layerName];
          }
        });
      }
    });

    layerKeys.forEach(layerName => {
      let layer = layers[layerName];

      if (typeof layer.parent === 'object') {
        this.tree[layerName] = layer;
      }

      delete layer.parent;
    });
  }
}

function getParent(Layer) {
  return DataMapMetadata.forTarget(Layer).fetch('parent-layer')
}
