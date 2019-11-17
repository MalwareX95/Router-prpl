var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { html, LitElement, customElement, property } from 'lit-element';
import './child1';
let MyComponent = class MyComponent extends LitElement {
    constructor() {
        super(...arguments);
        this._text = '';
    }
    _onInputChange(e) {
        this._text = e.target.value;
    }
    render() {
        return html `
            <input value="${this._text}" @change="${this._onInputChange}" type="text">
            <h1>bar</h1>
            <div>${this._text}</div>
            <child-1></child-1>
        `;
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], MyComponent.prototype, "_text", void 0);
MyComponent = __decorate([
    customElement('my-app')
], MyComponent);
//# sourceMappingURL=use.js.map