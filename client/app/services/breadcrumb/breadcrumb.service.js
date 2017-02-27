class BreadcrumbService {
  constructor($rootScope) {
    "ngInject";
    Object.assign(this, {
      $rootScope,
      chain: ["(Foodsaving)"],
      title: ""
    });
  }

  setTitle(pos, text) {
    this.chain[pos] = text;
    let reversed = angular.copy(this.chain);
    reversed.reverse();
    this.title = reversed.join(" · ");
    this.$rootScope.$broadcast("titleTextChange");
  }
}

export default BreadcrumbService;
