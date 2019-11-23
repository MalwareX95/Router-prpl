import {html, LitElement, customElement, property} from 'lit-element'
import './counter'

@customElement('home-view')
class HomeView extends LitElement{
    render(){
        return html`
            <h1>Home</h1>
            <app-counter></app-counter>
        `
    }
}
