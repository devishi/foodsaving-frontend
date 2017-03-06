import pickupEditCreateModule from "./pickupEditCreate";
import pickupEditCreateController from "./pickupEditCreate.controller";
import pickupEditCreateComponent from "./pickupEditCreate.component";
import pickupEditCreateTemplate from "./pickupEditCreate.html";

const { module } = angular.mock;

describe("pickupEditCreate", () => {
  let $componentController, $httpBackend;

  beforeEach(module(pickupEditCreateModule));
  beforeEach(() => {
    angular.mock.module(($provide) => {
      $provide.value("$mdDialog", {
        hide: () => {}
      });
    });
  });

  let $log;
  beforeEach(inject(($injector) => {
    $log = $injector.get("$log");
    $log.reset();
  }));
  afterEach(() => {
    $log.assertEmpty();
  });

  beforeEach(inject(($injector) => {
    $httpBackend = $injector.get("$httpBackend");
    $componentController = $injector.get("$componentController");
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe("Module", () => {
    it("is named pickupEditCreate", () => {
      expect(pickupEditCreateModule).to.equal("pickupEditCreate");
    });
  });

  describe("Controller", () => {
    let $ctrl, PickupDate, PickupDateSeries, $q, $rootScope, $mdDialog;

    beforeEach(inject(($injector) => {
      PickupDate = $injector.get("PickupDate");
      PickupDateSeries = $injector.get("PickupDateSeries");
      $q = $injector.get("$q");
      $rootScope = $injector.get("$rootScope");
      $mdDialog = $injector.get("$mdDialog");
      sinon.stub(PickupDate, "create");
      sinon.stub(PickupDate, "save");
      sinon.stub(PickupDateSeries, "create");
      sinon.stub(PickupDateSeries, "save");
      sinon.stub($mdDialog, "hide");
    }));

    let mockTime = (hour, minute) => {
      return {
        moment: {
          toDate: () => {
            return {
              getHours: () => {
                return hour;
              },
              getMinutes: () => {
                return minute;
              }
            };
          }
        }
      };
    };

    it("initializes", () => {
      $ctrl = $componentController("pickupEditCreate", {}, {
        data: {
          storeId: 2,
          series: true
        }
      });
      $ctrl.$onInit();
      expect($ctrl.days[2]).to.deep.equal({ key: "WE", name: "Wednesday" });

      // assumes that this test is run with the default "en" locale of moment.js
      expect($ctrl.timeLookup("8:00 PM").length).to.equal(1);
      expect($ctrl.timeLookup().length).to.equal(96);
    });

    it("creates one-time pickup", () => {
      $ctrl = $componentController("pickupEditCreate", {}, {
        data: {
          storeId: 2,
          series: false
        }
      });
      $ctrl.$onInit();
      expect($ctrl.isSeries).to.be.false;
      expect($ctrl.isCreate).to.be.true;
      $ctrl.singleData.date = new Date(2016,6,14);
      $ctrl.time = mockTime(15, 22);
      PickupDate.create.returns($q.resolve());
      $ctrl.handleSubmit();
      $rootScope.$apply();
      expect(PickupDate.create).to.have.been.calledWith({
        date: new Date(2016,6,14,15,22),
        "max_collectors": 2,
        store: 2
      });
      expect($mdDialog.hide).to.have.been.called;
    });

    it("creates regular pickup", () => {
      $ctrl = $componentController("pickupEditCreate", {
      }, {
        data: {
          storeId: 2,
          series: true
        }
      });
      $ctrl.$onInit();
      expect($ctrl.isSeries).to.be.true;
      expect($ctrl.isCreate).to.be.true;
      $ctrl.seriesData.rule.byDay = ["MO","TU"];
      $ctrl.time = mockTime(15, 22);
      PickupDateSeries.create.returns($q.resolve());
      $ctrl.handleSubmit();
      $rootScope.$apply();
      let date = angular.copy($ctrl.seriesData.start_date);
      date.setHours(15);
      date.setMinutes(22);
      expect(PickupDateSeries.create).to.have.been.calledWith({
        "start_date": date,
        rule: {
          byDay: ["MO", "TU"],
          freq: "WEEKLY"
        },
        "max_collectors": 2,
        store: 2
      });
      expect($mdDialog.hide).to.have.been.called;
    });

    it("edits one-time pickup", () => {
      let date = new Date(2016,2,25,0,0);
      $ctrl = $componentController("pickupEditCreate", {}, {
        data: {
          storeId: 2,
          series: false,
          editData: {
            id: 67,
            date,
            "max_collectors": 5,
            store: 3
          }
        }
      });
      $ctrl.$onInit();
      expect($ctrl.isSeries).to.be.false;
      expect($ctrl.isCreate).to.be.false;
      $ctrl.time = mockTime(15, 22);
      PickupDate.save.returns($q.resolve());
      $ctrl.handleSubmit();
      $rootScope.$apply();
      expect(PickupDate.save).to.have.been.calledWith({
        id: 67,
        date: new Date(2016,2,25,15,22),
        store: 3,
        "max_collectors": 5
      });
      expect($mdDialog.hide).to.have.been.called;
    });

    it("edits regular pickup", () => {
      $ctrl = $componentController("pickupEditCreate", {
      }, {
        data: {
          storeId: 2,
          series: true,
          editData: {
            id: 67,
            "start_date": new Date(2016,2,25,0,0),
            "max_collectors": 6,
            rule: {
              byDay: ["MO"]
            },
            store: 3
          }
        }
      });
      $ctrl.$onInit();
      expect($ctrl.isSeries).to.be.true;
      expect($ctrl.isCreate).to.be.false;
      $ctrl.seriesData.rule.byDay = ["MO","TU"];
      $ctrl.time = mockTime(15, 22);
      PickupDateSeries.save.returns($q.resolve());
      $ctrl.handleSubmit();
      $rootScope.$apply();
      expect(PickupDateSeries.save).to.have.been.calledWith({
        id: 67,
        "start_date": new Date(2016,2,25,15,22),
        "max_collectors": 6,
        rule: {
          byDay: ["MO", "TU"]
        },
        store: 3
      });
      expect($mdDialog.hide).to.have.been.called;
    });
  });

  describe("Component", () => {
    // component/directive specs
    let component = pickupEditCreateComponent;

    it("includes the intended template",() => {
      expect(component.template).to.equal(pickupEditCreateTemplate);
    });

    it("invokes the right controller", () => {
      expect(component.controller).to.equal(pickupEditCreateController);
    });
  });
});
