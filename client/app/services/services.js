import angular from "angular";
import Authentication from "./authentication/authentication";
import Group from "./group/group";
import PickupDate from "./pickupDate/pickupDate";
import Store from "./store/store";
import User from "./user/user";
import Breadcrumb from "./breadcrumb/breadcrumb";

let serviceModule = angular.module("app.services", [
  Authentication,
  Group,
  PickupDate,
  Store,
  User,
  Breadcrumb
])

.name;

export default serviceModule;
