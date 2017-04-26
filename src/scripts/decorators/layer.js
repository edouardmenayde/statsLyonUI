import {Container} from "aurelia-framework";

export function layer(Layer) {
  return function (target) {

    if (!target.prototype.layers) {
      target.prototype.layers = [];
    }

    target.prototype.layers.push(Container.instance.get(Layer));
  }
}
