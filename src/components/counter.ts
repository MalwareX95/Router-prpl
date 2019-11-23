import {LitElement, html, customElement} from 'lit-element'
import { store } from '../store'
import { increment, decrement } from '../actions/app'

@customElement('app-counter')
export class CounterComponent extends LitElement{
    _increment(){
        // store.dispatch(increment())
    }

    _decrement(){
        // store.dispatch(decrement())
    }

    render(){
        return html`
            <div>
                <button @click=${this._increment}>Inkrement</button>
                <button @click=${this._decrement}>Dekrement</button>
            </div>
        `
    }
}