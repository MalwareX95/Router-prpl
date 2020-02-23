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
import { store } from '../store';
import { connect } from 'pwa-helpers';
import './counter';
import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-select';
import '@vaadin/vaadin-time-picker';
let HomeView = class HomeView extends connect(store)(LitElement) {
    constructor() {
        super(...arguments);
        this.counts = 0;
    }
    stateChanged(state) {
        this.counts = state.counter.value;
    }
    firstUpdated() {
        console.log(this.location);
    }
    onAfterLeave() {
        console.log('onAfterLeave');
    }
    onAfterEnter() {
        console.log('onAfterEnter');
    }
    render() {
        return html `
            <h1>Home</h1>
            
            <h2>${this.counts}</h2>
            <vaadin-date-picker label="Date" placeholder="Pick a date"></vaadin-date-picker> -->
            <vaadin-time-picker label="Arrival hour (hh:mm)"></vaadin-time-picker>
            <vaadin-select>
                <template>
                    <vaadin-list-box>
                    <vaadin-item>Jose</vaadin-item>
                    <vaadin-item>Manolo</vaadin-item>
                    <vaadin-item>Pedro</vaadin-item>
                    </vaadin-list-box>
                </template>
            </vaadin-select>
            <!-- <app-counter></app-counter> -->
        `;
    }
};
__decorate([
    property({ type: Number }),
    __metadata("design:type", Number)
], HomeView.prototype, "counts", void 0);
HomeView = __decorate([
    customElement('home-view')
], HomeView);
export { HomeView };
//# sourceMappingURL=home.js.map