import { _ as __nuxt_component_0, q as queryCollection } from './app-Bzn95VXh.mjs';
import { defineComponent, mergeProps, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
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
    const { data: pages } = useAsyncData("blog-page", () => {
      return queryCollection("posts").all();
    });
    if (!pages.value || pages.value.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Page not found"
      });
    }
    const herpPost = pages.value.at(0);
    if (!herpPost) {
      throw createError({
        statusCode: 404,
        statusMessage: "Post not found"
      });
    }
    const posts = pages.value.slice(1);
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
            _push2(`<h2 class="text-xl-center mb-4"${_scopeId}>Blog</h2><p class="text-muted text-center mb-6"${_scopeId}> Welcome to our blog! Here you will find the latest updates, insights, and stories from our team. </p>`);
            if (!unref(posts) || unref(posts).length === 0) {
              _push2(`<div${_scopeId}>Home not found</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(herpPost)) {
              _push2(ssrRenderComponent(_component_ContentRenderer, { value: unref(herpPost) }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(unref(posts), (post) => {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ContentRenderer, { value: post }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              createVNode("h2", { class: "text-xl-center mb-4" }, "Blog"),
              createVNode("p", { class: "text-muted text-center mb-6" }, " Welcome to our blog! Here you will find the latest updates, insights, and stories from our team. "),
              !unref(posts) || unref(posts).length === 0 ? (openBlock(), createBlock("div", { key: 0 }, "Home not found")) : createCommentVNode("", true),
              unref(herpPost) ? (openBlock(), createBlock(_component_ContentRenderer, {
                key: 1,
                value: unref(herpPost)
              }, null, 8, ["value"])) : createCommentVNode("", true),
              (openBlock(true), createBlock(Fragment, null, renderList(unref(posts), (post) => {
                return openBlock(), createBlock("div", {
                  key: post.id
                }, [
                  createVNode(_component_ContentRenderer, { value: post }, null, 8, ["value"])
                ]);
              }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Bv1MTlP5.mjs.map
