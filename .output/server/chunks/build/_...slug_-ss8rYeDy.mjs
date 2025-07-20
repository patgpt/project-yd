import { defineComponent, withAsyncContext, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { A as useRoute } from './server.mjs';
import { u as useAsyncData } from './asyncData-0b48-_jo.mjs';
import { _ as __nuxt_component_0, q as queryCollection } from './app-Bzn95VXh.mjs';
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
import 'vue-router';
import '@iconify/vue';
import 'perfect-debounce';
import 'property-information';
import 'minimark/hast';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { data: post } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(route.path, () => {
      return queryCollection("posts").path(route.path).first();
    }, "$DquttgHoet")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(post)) {
        _push(ssrRenderComponent(unref(__nuxt_component_0), mergeProps({ value: unref(post) }, _attrs), null, _parent));
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)}>Post not found</div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-ss8rYeDy.mjs.map
