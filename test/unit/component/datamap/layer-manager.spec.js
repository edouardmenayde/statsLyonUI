import {LayerManager} from '../../../../src/scripts/component/datamap/layer-manager';

describe('LayerManager', () => {
  describe('.generateTree()', () => {
    it('Should generate a dependency tree', () => {
      const layers       = {
        TestLayer  : ['PeopleLayer'],
        PeopleLayer: [],
        GoldLayer  : [],
        GodLayer   : ['TestLayer']
      };
      const expectedTree = {
        GoldLayer: {},
        GodLayer : {
          TestLayer: {
            PeopleLayer: {}
          }
        }
      };

      const layerManager = new LayerManager();

      layerManager.generateTree(layers);

      expect(layerManager.tree).toBe(expectedTree);
    });
  });
});
