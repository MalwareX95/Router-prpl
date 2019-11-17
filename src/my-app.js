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
let HomeComponent = class HomeComponent extends LitElement {
    constructor() {
        super(...arguments);
        this._text = '';
    }
    _onInputChange(e) {
        this._text = e.target.value;
    }
    render() {
        return html `
            <h1>Home</h1>
            <!-- <input value="${this._text}" @change="${this._onInputChange}" type="text">
            <h1>my-app</h1>
            <div>${this._text}</div> -->
        `;
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], HomeComponent.prototype, "_text", void 0);
HomeComponent = __decorate([
    customElement('my-app')
], HomeComponent);
//# sourceMappingURL=my-app.js.map