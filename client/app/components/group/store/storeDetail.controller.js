class StoreDetailController {
  constructor(Store, breadcrumb) {
    "ngInject";
    Object.assign(this, {
      Store,
      breadcrumb,
      pickupListOptions: {
        showCreateButton: true,
        filter: {
          showJoined: true,
          showOpen: true,
          showFull: true
        }
      }
    });
  }

  $onChanges() {
    this.breadcrumb.setTitle(2, this.storedata.name);
  }
}

export default StoreDetailController;
