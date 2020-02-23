import {html, LitElement, customElement, property} from 'lit-element'
import {store, RootState} from '../store'
import {connect} from 'pwa-helpers'
import {Router} from '@vaadin/router'
import './counter'
import '@vaadin/vaadin-date-picker'
import '@vaadin/vaadin-select'
import '@vaadin/vaadin-time-picker'


@customElement('home-view')
export class HomeView extends connect(store)(LitElement){
    
    @property({type: Number})
    counts: number = 0

    stateChanged(state: RootState){
        this.counts = state.counter!.value
    }

    firstUpdated(){
        console.log((this as any).location)
    }

    onAfterLeave(){
        console.log('onAfterLeave')
    }

    onAfterEnter(){
        console.log('onAfterEnter')
    }

    render(){
        return html`
            <h1>Home</h1>
            
            <h2>${this.counts}</h2>
            <vaadin-date-picker label="Date" placeholder="Pick a date"></vaadin-date-picker>
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
        `
    }
}
