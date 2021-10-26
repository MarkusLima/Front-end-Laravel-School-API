import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: () => import("@/views/Home"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/HomeGlobal")
        },
      ]
    },
    {
      name: "schools",
      path: "/schools",
      props: true,
      component: () => import("@/views/ArticleEdit")
    },
    {
      name: "schools_add",
      path: "/schools_add",
      props: true,
      component: () => import("@/views/Schools_add")
    },
    {
      name: "schools_edit",
      path: "/schools_edit/:school_id",
      props: true,
      component: () => import("@/views/Schools_edit")
    },
    {
      name: "students",
      path: "/students",
      props: true,
      component: () => import("@/views/Students")
    },
    {
      name: "students_add",
      path: "/students_add",
      props: true,
      component: () => import("@/views/Students_add")
    },
    {
      name: "students_edit",
      path: "/students_edit/:student_id",
      props: true,
      component: () => import("@/views/Students_edit")
    },
    {
      name: "students_add_class",
      path: "/students_add_class/:student_id",
      props: true,
      component: () => import("@/views/Students_add_class")
    },
    {
      name: "classes",
      path: "/classes",
      props: true,
      component: () => import("@/views/Classes")
    },
    {
      name: "classes_add",
      path: "/classes_add",
      props: true,
      component: () => import("@/views/Classes_add")
    },
    {
      name: "classes_edit",
      path: "/classes_edit/:class_id",
      props: true,
      component: () => import("@/views/Classes_edit")
    },
    {
      name: "classes_show",
      path: "/classes_show/:class_id",
      props: true,
      component: () => import("@/views/Classes_show")
    }
  ]
});
