export default {
  namespaced: true,
  state: {
    // 目录
    menu: {
      visible: true,
      active: '/',
      children: []
    },
    // 工具栏
    toolbar: {
      visible: true,
      children: {
        pageSearch: {
          component: 'el-input',
          visible: true,
          model: '',
          bind: {
            size: "mini",
            radius: true, clearable: true, 'prefix-icon': "el-icon-search", style: {
              width: '200px',
              borderRadius: '50%',
              marginRight: '10px'
            }
          },
          on: {}
        },
        refresh: {
          component: 'el-button',
          visible: true,
          model: '',
          bind: {
            size: "mini",
            type: "warning", icon: "el-icon-refresh", circle: true,
          },
          on: {
            // click: undefined
          }
        },
        delete: {
          component: 'el-button',
          visible: true,
          model: '',
          bind: {
            size: "mini",
            type: "danger", icon: "el-icon-delete", circle: true,
          },
          on: {}
        },
      }
    },
  },
  mutations: {
    SET_MENU_VISIBLE(state, payload) {
      state.menu.visible = payload;
    },
    SET_MENU_ACTIVE(state, payload) {
      state.menu.active = payload;
    },
    SET_TOOLBAR_VISIBLE(state, payload) {
      state.toolbar.visible = payload
    }
  },
  actions: {
    setter({ commit }, { key, value }) { }
  }
}