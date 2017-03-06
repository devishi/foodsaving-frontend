import GroupHistoryModule from "./groupHistory";

const { module } = angular.mock;

describe("GroupHistory", () => {
  beforeEach(module(GroupHistoryModule));

  let $log;
  beforeEach(inject(($injector) => {
    $log = $injector.get("$log");
    $log.reset();
  }));
  afterEach(() => {
    $log.assertEmpty();
  });

  describe("Module", () => {
    it("is named groupHistory", () => {
      expect(GroupHistoryModule).to.equal("groupHistory");
    });
  });

  describe("Controller", () => {
    let $componentController;
    beforeEach(inject(($injector) => {
      $componentController = $injector.get("$componentController");
    }));

    it("should exist", () => {
      let $ctrl = $componentController("groupHistory", {});
      expect($ctrl).to.exist;
    });
  });
});
