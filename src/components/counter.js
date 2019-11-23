var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement } from 'lit-element';
let CounterComponent = class CounterComponent extends LitElement {
    _increment() {
        // store.dispatch(increment())
    }
    _decrement() {
        // store.dispatch(decrement())
    }
    render() {
        return html `
            <div>
                <button @click=${this._increment}>Inkrement</button>
                <button @click=${this._decrement}>Dekrement</button>
            </div>
        `;
    }
};
CounterComponent = __decorate([
    customElement('app-counter')
], CounterComponent);
export { CounterComponent };
//# sourceMappingURL=counter.js.map