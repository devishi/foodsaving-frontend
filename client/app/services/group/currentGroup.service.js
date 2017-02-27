/**
  Makes the currently selected group available as a service.

  Uses `angular.copy()` so you can bind the value to your
  controller and it will keep updated. e.g.:

    `this.activeGroup = CurrentGroup.value`

*/
export default class CurrentGroup {

  constructor($rootScope) {
    "ngInject";
    Object.assign(this, {
      value: {},
      $rootScope
    });
  }

  set(value) {
    angular.copy(value, this.value);
  }

  clear() {
    angular.copy({}, this.value);
  }

}
