define(["./routing.js"],function(_routing){"use strict";var __decorate=void 0||function(decorators,target,key,desc){var c=arguments.length,r=3>c?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;0<=i;i--)if(d=decorators[i])r=(3>c?d(r):3<c?d(target,key,r):d(target,key))||r;return 3<c&&r&&Object.defineProperty(target,key,r),r},__metadata=void 0||function(k,v){if("object"===typeof Reflect&&"function"===typeof Reflect.metadata)return Reflect.metadata(k,v)};let MyComponent=class MyComponent extends _routing.LitElement{constructor(){super(...arguments);this._text=""}_onInputChange(e){this._text=e.target.value}render(){return _routing.html`
            <h1>Page1</h1>
            <!-- <input value="${this._text}" @change="${this._onInputChange}" type="text">
            <h1>bar</h1>
            <div>${this._text}</div>
            <child-1></child-1> -->
        `}};__decorate([(0,_routing.property)({type:String}),__metadata("design:type",String)],MyComponent.prototype,"_text",void 0);MyComponent=__decorate([(0,_routing.customElement)("page1-component")],MyComponent)});