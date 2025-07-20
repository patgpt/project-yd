import { mergeProps, withCtx, renderSlot as renderSlot$1, createBlock, createCommentVNode, openBlock, createVNode, ref, watchEffect, watch, computed, normalizeStyle, normalizeClass, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot as ssrRenderSlot$1 } from 'vue/server-renderer';
import { f as flatUnwrap } from './app-Bzn95VXh.mjs';
import { V as VContainer, a as useRender, c as makeComponentProps } from './VContainer-D--PGBTh.mjs';
import { V as VRow, a as VCol, b as VBtn, y as VAvatar, l as VImg, P as useIntersectionObserver, K as useResizeObserver } from './VAvatar-tp6sVC-t.mjs';
import { g as genericComponent, a as propsFactory, a6 as useDisplay, j as clamp } from './server.mjs';
import { g as getScrollParent } from './getScrollParent-D1DffrVh.mjs';
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
import 'vue-router';
import '@iconify/vue';

const ssrRenderSlot = (slots, name, props, fallbackRenderFn, push, parentComponent, slotScopeId) => {
  if (slots[name]) {
    return ssrRenderSlot$1({ ...slots, [name]: () => flatUnwrap(slots[name](), props?.unwrap || props?.mdcUnwrap) }, name, props, fallbackRenderFn, push, parentComponent, slotScopeId);
  }
  return ssrRenderSlot$1(slots, name, props, fallbackRenderFn, push, parentComponent, slotScopeId);
};
const renderSlot = (slots, name, props, ...rest) => {
  if (slots[name]) {
    return renderSlot$1({ ...slots, [name]: () => flatUnwrap(slots[name](), props?.unwrap || props?.mdcUnwrap) }, name, props, ...rest);
  }
  return renderSlot$1(slots, name, props, ...rest);
};
function floor(val) {
  return Math.floor(Math.abs(val)) * Math.sign(val);
}
const makeVParallaxProps = propsFactory({
  scale: {
    type: [Number, String],
    default: 0.5
  },
  ...makeComponentProps()
}, "VParallax");
const VParallax = genericComponent()({
  name: "VParallax",
  props: makeVParallaxProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const {
      resizeRef,
      contentRect
    } = useResizeObserver();
    const {
      height: displayHeight
    } = useDisplay();
    const root = ref();
    watchEffect(() => {
      intersectionRef.value = resizeRef.value = root.value?.$el;
    });
    let scrollParent;
    watch(isIntersecting, (val) => {
      if (val) {
        scrollParent = getScrollParent(intersectionRef.value);
        scrollParent = scrollParent === (void 0).scrollingElement ? void 0 : scrollParent;
        scrollParent.addEventListener("scroll", onScroll, {
          passive: true
        });
        onScroll();
      } else {
        scrollParent.removeEventListener("scroll", onScroll);
      }
    });
    watch(displayHeight, onScroll);
    watch(() => contentRect.value?.height, onScroll);
    const scale = computed(() => {
      return 1 - clamp(Number(props.scale));
    });
    let frame = -1;
    function onScroll() {
      if (!isIntersecting.value) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = (root.value?.$el).querySelector(".v-img__img");
        if (!el) return;
        const scrollHeight = scrollParent instanceof Document ? (void 0).documentElement.clientHeight : scrollParent.clientHeight;
        const scrollPos = scrollParent instanceof Document ? (void 0).scrollY : scrollParent.scrollTop;
        const top = intersectionRef.value.getBoundingClientRect().top + scrollPos;
        const height = contentRect.value.height;
        const center = top + (height - scrollHeight) / 2;
        const translate = floor((scrollPos - center) * scale.value);
        const sizeScale = Math.max(1, (scale.value * (scrollHeight - height) + height) / height);
        el.style.setProperty("transform", `translateY(${translate}px) scale(${sizeScale})`);
      });
    }
    useRender(() => createVNode(VImg, {
      "class": normalizeClass(["v-parallax", {
        "v-parallax--active": isIntersecting.value
      }, props.class]),
      "style": normalizeStyle(props.style),
      "ref": root,
      "cover": true,
      "onLoadstart": onScroll,
      "onLoad": onScroll
    }, slots));
    return {};
  }
});
const _sfc_main = {
  __name: "ContentHero",
  __ssrInlineRender: true,
  props: {
    bg: {
      type: String,
      default: "https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    },
    avatar: {
      type: String,
      default: "https://randomuser.me/api/portraits/men/78.jpg"
    },
    ctaLink: {
      type: String,
      default: "/"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VParallax, mergeProps({
        src: __props.bg,
        height: "600"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VContainer, { class: "fill-height" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, { class: "justify-center align-center flex-column-reverse flex-md-row" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (_ctx.$slots.heading) {
                                _push5(`<h1 class="text-h1 mb-8"${_scopeId4}>`);
                                ssrRenderSlot(_ctx.$slots, "heading", { mdcUnwrap: "p" }, null, _push5, _parent5, _scopeId4);
                                _push5(`</h1>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              if (_ctx.$slots.subheading) {
                                _push5(`<h3 class="text-h3 mb-8 font-weight-thin"${_scopeId4}>`);
                                ssrRenderSlot(_ctx.$slots, "subheading", { mdcUnwrap: "p" }, null, _push5, _parent5, _scopeId4);
                                _push5(`</h3>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              if (_ctx.$slots.ctaText) {
                                _push5(ssrRenderComponent(VBtn, {
                                  class: "elevation-4 rounded-xl mb-4",
                                  color: "primary",
                                  to: __props.ctaLink
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      ssrRenderSlot$1(_ctx.$slots, "ctaText", {}, null, _push6, _parent6, _scopeId5);
                                    } else {
                                      return [
                                        renderSlot$1(_ctx.$slots, "ctaText")
                                      ];
                                    }
                                  }),
                                  _: 3
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                _ctx.$slots.heading ? (openBlock(), createBlock("h1", {
                                  key: 0,
                                  class: "text-h1 mb-8"
                                }, [
                                  renderSlot(_ctx.$slots, "heading", { mdcUnwrap: "p" })
                                ])) : createCommentVNode("", true),
                                _ctx.$slots.subheading ? (openBlock(), createBlock("h3", {
                                  key: 1,
                                  class: "text-h3 mb-8 font-weight-thin"
                                }, [
                                  renderSlot(_ctx.$slots, "subheading", { mdcUnwrap: "p" })
                                ])) : createCommentVNode("", true),
                                _ctx.$slots.ctaText ? (openBlock(), createBlock(VBtn, {
                                  key: 2,
                                  class: "elevation-4 rounded-xl mb-4",
                                  color: "primary",
                                  to: __props.ctaLink
                                }, {
                                  default: withCtx(() => [
                                    renderSlot$1(_ctx.$slots, "ctaText")
                                  ]),
                                  _: 3
                                }, 8, ["to"])) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 3
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          class: "text-center",
                          cols: "12",
                          md: "6"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (__props.avatar) {
                                _push5(ssrRenderComponent(VAvatar, {
                                  size: 300,
                                  class: "elevation-12 mx-auto mb-8"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VImg, { src: __props.avatar }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VImg, { src: __props.avatar }, null, 8, ["src"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                __props.avatar ? (openBlock(), createBlock(VAvatar, {
                                  key: 0,
                                  size: 300,
                                  class: "elevation-12 mx-auto mb-8"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VImg, { src: __props.avatar }, null, 8, ["src"])
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, {
                            cols: "12",
                            md: "6"
                          }, {
                            default: withCtx(() => [
                              _ctx.$slots.heading ? (openBlock(), createBlock("h1", {
                                key: 0,
                                class: "text-h1 mb-8"
                              }, [
                                renderSlot(_ctx.$slots, "heading", { mdcUnwrap: "p" })
                              ])) : createCommentVNode("", true),
                              _ctx.$slots.subheading ? (openBlock(), createBlock("h3", {
                                key: 1,
                                class: "text-h3 mb-8 font-weight-thin"
                              }, [
                                renderSlot(_ctx.$slots, "subheading", { mdcUnwrap: "p" })
                              ])) : createCommentVNode("", true),
                              _ctx.$slots.ctaText ? (openBlock(), createBlock(VBtn, {
                                key: 2,
                                class: "elevation-4 rounded-xl mb-4",
                                color: "primary",
                                to: __props.ctaLink
                              }, {
                                default: withCtx(() => [
                                  renderSlot$1(_ctx.$slots, "ctaText")
                                ]),
                                _: 3
                              }, 8, ["to"])) : createCommentVNode("", true)
                            ]),
                            _: 3
                          }),
                          createVNode(VCol, {
                            class: "text-center",
                            cols: "12",
                            md: "6"
                          }, {
                            default: withCtx(() => [
                              __props.avatar ? (openBlock(), createBlock(VAvatar, {
                                key: 0,
                                size: 300,
                                class: "elevation-12 mx-auto mb-8"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VImg, { src: __props.avatar }, null, 8, ["src"])
                                ]),
                                _: 1
                              })) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VRow, { class: "justify-center align-center flex-column-reverse flex-md-row" }, {
                      default: withCtx(() => [
                        createVNode(VCol, {
                          cols: "12",
                          md: "6"
                        }, {
                          default: withCtx(() => [
                            _ctx.$slots.heading ? (openBlock(), createBlock("h1", {
                              key: 0,
                              class: "text-h1 mb-8"
                            }, [
                              renderSlot(_ctx.$slots, "heading", { mdcUnwrap: "p" })
                            ])) : createCommentVNode("", true),
                            _ctx.$slots.subheading ? (openBlock(), createBlock("h3", {
                              key: 1,
                              class: "text-h3 mb-8 font-weight-thin"
                            }, [
                              renderSlot(_ctx.$slots, "subheading", { mdcUnwrap: "p" })
                            ])) : createCommentVNode("", true),
                            _ctx.$slots.ctaText ? (openBlock(), createBlock(VBtn, {
                              key: 2,
                              class: "elevation-4 rounded-xl mb-4",
                              color: "primary",
                              to: __props.ctaLink
                            }, {
                              default: withCtx(() => [
                                renderSlot$1(_ctx.$slots, "ctaText")
                              ]),
                              _: 3
                            }, 8, ["to"])) : createCommentVNode("", true)
                          ]),
                          _: 3
                        }),
                        createVNode(VCol, {
                          class: "text-center",
                          cols: "12",
                          md: "6"
                        }, {
                          default: withCtx(() => [
                            __props.avatar ? (openBlock(), createBlock(VAvatar, {
                              key: 0,
                              size: 300,
                              class: "elevation-12 mx-auto mb-8"
                            }, {
                              default: withCtx(() => [
                                createVNode(VImg, { src: __props.avatar }, null, 8, ["src"])
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 3
                    })
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VContainer, { class: "fill-height" }, {
                default: withCtx(() => [
                  createVNode(VRow, { class: "justify-center align-center flex-column-reverse flex-md-row" }, {
                    default: withCtx(() => [
                      createVNode(VCol, {
                        cols: "12",
                        md: "6"
                      }, {
                        default: withCtx(() => [
                          _ctx.$slots.heading ? (openBlock(), createBlock("h1", {
                            key: 0,
                            class: "text-h1 mb-8"
                          }, [
                            renderSlot(_ctx.$slots, "heading", { mdcUnwrap: "p" })
                          ])) : createCommentVNode("", true),
                          _ctx.$slots.subheading ? (openBlock(), createBlock("h3", {
                            key: 1,
                            class: "text-h3 mb-8 font-weight-thin"
                          }, [
                            renderSlot(_ctx.$slots, "subheading", { mdcUnwrap: "p" })
                          ])) : createCommentVNode("", true),
                          _ctx.$slots.ctaText ? (openBlock(), createBlock(VBtn, {
                            key: 2,
                            class: "elevation-4 rounded-xl mb-4",
                            color: "primary",
                            to: __props.ctaLink
                          }, {
                            default: withCtx(() => [
                              renderSlot$1(_ctx.$slots, "ctaText")
                            ]),
                            _: 3
                          }, 8, ["to"])) : createCommentVNode("", true)
                        ]),
                        _: 3
                      }),
                      createVNode(VCol, {
                        class: "text-center",
                        cols: "12",
                        md: "6"
                      }, {
                        default: withCtx(() => [
                          __props.avatar ? (openBlock(), createBlock(VAvatar, {
                            key: 0,
                            size: 300,
                            class: "elevation-12 mx-auto mb-8"
                          }, {
                            default: withCtx(() => [
                              createVNode(VImg, { src: __props.avatar }, null, 8, ["src"])
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/ContentHero.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ContentHero-D0eE7xjZ.mjs.map
