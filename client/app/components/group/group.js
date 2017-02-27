import angular from "angular";
import uiRouter from "angular-ui-router";
import ngMaterial from "angular-material";
import groupComponent from "./group.component";
import AuthenticationModule from "../../services/authentication/authentication";
import groupModule from "../../services/group/group";
import store from "./store/storeDetail";
import storeList from "./_storeList/storeList";
import groupDetail from "./groupDetail/groupDetail";
import groupEdit from "./groupEdit/groupEdit";
import createGroup from "./createGroup/createGroup";

let groupPageModule = angular.module("group", [
  uiRouter,
  AuthenticationModule,
  ngMaterial,
  groupModule,
  store,
  groupDetail,
  groupEdit,
  createGroup,
  storeList
])

.component("group", groupComponent)

.config(($stateProvider, hookProvider) => {
  "ngInject";
  $stateProvider
    .state("group", {
      parent: "main",
      url: "/group/{groupId:int}",
      redirectTo: "group.groupDetail.pickups",
      component: "group",
      resolve: {
        groupData: (CurrentGroup) => {
          return CurrentGroup.value;
        },
        groupDataResolve: ($state, GroupService, CurrentGroup, $stateParams) => {
          return GroupService.get($stateParams.groupId).then((group) => {
            CurrentGroup.set(group);
            return group;
          });
        }
      }
    });
  hookProvider.setup("group", { authenticated: true, anonymous: "login" });
})

.name;

export default groupPageModule;
