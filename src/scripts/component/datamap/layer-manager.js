import {DataMapMetadata} from './datamap-metadata';

export class LayerManager {

  tree         = {};
  layerClasses = [];
  layers       = new Map();

  populateLayers(canvas) {
    this.layerClasses.forEach(LayerClass => {
      this.layers.set(LayerClass.name, new LayerClass(this, canvas));
    });
  }

  /**
   * Register layers.
   * @param {array} LayersClasses
   */
  registerLayers(LayersClasses) {
    this.layerClasses = LayersClasses;

    let layers = {};

    LayersClasses.forEach(LayerClass => {
      layers[LayerClass.name] = DataMapMetadata.forTarget(LayerClass).fetch('sublayers');
    });

    this.generateTree(layers);
  }

  fetchTree() {
    return this.tree;
  }

  generateTree(layers) {
    let tree = {};

    for (let layer in layers) {
      if (layers.hasOwnProperty(layer)) {
        tree[layer] = this.resolveDependencies(layers[layer], layers);
      }
    }

    // console.log(tree)
    //
    // this.removeDuplicates(tree);

    this.tree = tree;
  }

  existInLayer(needle, layers) {
    let exists = false;

    for (let layer in layers) {
      if (layers.hasOwnProperty(layer)) {
        if (layer === needle) {
          exists = true;
        }
      }
    }

    return exists;
  }

  findInLayer(needle, layers) {
    let searchedLayer = null;

    for (let layer in layers) {
      if (layers.hasOwnProperty(layer)) {
        if (layer === needle) {
          searchedLayer = layers[layer];
        }
      }
    }

    return searchedLayer;
  }

  resolveDependencies(layer, layers) {
    let resolvedLayer = {};

    layer.forEach(sublayerName => {
      let sublayer = this.findInLayer(sublayerName, layers);
      if (sublayer.length) {
        if (!Array.isArray(sublayer)) {
          resolvedLayer[sublayerName] = sublayer;
        }
        if (sublayer.length > 0) {
          resolvedLayer[sublayerName] = this.resolveDependencies(resolvedLayer[sublayerName], layers);
        }
      }
    });

    return resolvedLayer;
  }

  removeDuplicates(tree) {
    for (let layer in tree) {
      if (tree.hasOwnProperty(layer)) {
        for (let sublayer in tree[layer]) {
          if (tree[layer].hasOwnProperty(sublayer)) {
            if (this.existInLayer(sublayer, tree)) {
              delete tree[sublayer];
            }

            this.removeDuplicates(tree[layer]);
          }
        }
      }
    }
  }
}
