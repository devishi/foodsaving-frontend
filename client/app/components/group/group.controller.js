class GroupController {
  constructor($state, $mdMedia, breadcrumb) {
    "ngInject";
    Object.assign(this, {
      $state,
      $mdMedia,
      breadcrumb
    });
  }

  $onChanges() {
    this.breadcrumb.setTitle(1, this.groupData.name);
  }
}

export default GroupController;
