import Breadcrumb from "./breadcrumb.service";

let BreadcrumbModule = angular.module("Breadcrumb", [])

.service("breadcrumb", Breadcrumb)

.name;

export default BreadcrumbModule;
