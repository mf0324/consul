import Service, { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Service.extend({
  store: service('store'),
  findAllByDatacenter: function(dc) {
    return get(this, 'store')
      .query('service', { dc: dc })
      .then(
        // TODO: Do I actually need to do this?
        function(items) {
          return items.forEach(function(item) {
            set(item, 'Datacenter', dc);
          });
        }
      );
  },
  findBySlug: function(slug, dc) {
    return get(this, 'store')
      .queryRecord('service', {
        id: slug,
        dc: dc,
      })
      .then(function(item) {
        return get(item, 'Nodes');
      });
  },
});