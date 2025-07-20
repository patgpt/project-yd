import { _ as __nuxt_component_0, q as queryCollection } from './app-CO8RbSun.mjs';
import { defineComponent, mergeProps, withCtx, unref, createBlock, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-0b48-_jo.mjs';
import { c as createError } from './server.mjs';
import { V as VContainer } from './VContainer-D--PGBTh.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'better-sqlite3';
import 'ipx';
import 'property-information';
import 'minimark/hast';
import 'perfect-debounce';
import 'vue-router';
import '@iconify/vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { data: page } = useAsyncData("landing-page", () => {
      return queryCollection("landing").first();
    });
    if (!page) {
      throw createError({
        statusCode: 404,
        statusMessage: "Page not found"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentRenderer = __nuxt_component_0;
      _push(ssrRenderComponent(VContainer, mergeProps({
        "d-flex": "",
        "justify-center": "",
        "align-with-title": "",
        class: "d-flex flex-column"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(page)) {
              _push2(ssrRenderComponent(_component_ContentRenderer, { value: unref(page) }, null, _parent2, _scopeId));
            } else {
              _push2(`<div${_scopeId}>Home not found</div>`);
            }
          } else {
            return [
              unref(page) ? (openBlock(), createBlock(_component_ContentRenderer, {
                key: 0,
                value: unref(page)
              }, null, 8, ["value"])) : (openBlock(), createBlock("div", { key: 1 }, "Home not found"))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/services/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DdEzgmRd.mjs.map
