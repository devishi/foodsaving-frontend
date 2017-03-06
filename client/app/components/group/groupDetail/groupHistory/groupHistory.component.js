import template from "./groupHistory.html";
import controller from "./groupHistory.controller";
import "./groupHistory.styl";

let groupHistoryComponent = {
  restrict: "",
  bindings: {
    groupHistory: "<"
  },
  template,
  controller
};

export default groupHistoryComponent;
