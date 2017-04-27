import {LayerManager} from '../../../../src/scripts/component/datamap/layer-manager';

describe('LayerManager', () => {
  describe('.generateTree()', () => {
    it('Should generate a dependency tree', () => {
      const layers       = {
        TestLayer  : {
          parent: 'GodLayer'
        },
        PeopleLayer: {
          parent: 'TestLayer'
        },
        GodLayer   : {
          parent: null
        },
        GoldLayer  : {
          parent: null
        }
      };
      const expectedTree = {
        GodLayer : {
          TestLayer: {
            PeopleLayer: {}
          }
        },
        GoldLayer: {}
      };

      const layerManager = new LayerManager();

      layerManager.generateTree(layers);

      expect(layerManager.tree).toEqual(expectedTree);
    });
  });
});
