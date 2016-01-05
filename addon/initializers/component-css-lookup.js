import Ember from 'ember';

export function appendComponentCSSClassName(name, Component) {
  if (!Component) {
    return;
  }

  if (Component.prototype.classNames.indexOf(Ember.COMPONENT_CSS_LOOKUP[name]) > -1) {
    return Component;
  }

  return Component.reopen({
    classNames: [ Ember.COMPONENT_CSS_LOOKUP[name] ]
  });
}

export function initialize() {
  Ember.ComponentLookup.reopen({
    lookupFactory: function lookupFactory(name, container) {
      var Component = this._super(name, container);

      return appendComponentCSSClassName(name, Component);
    },
    componentFor: function componentFor(name, container) {
      var Component = this._super(name, container);

      return appendComponentCSSClassName(name, Component);
    }
  });
}

export default {
  name: 'component-css-lookup',
  initialize: initialize
};
