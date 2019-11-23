import {html, LitElement, customElement, property} from 'lit-element'

@customElement('contact-view')
class ContactView extends LitElement{
    @property({type: String})
    _text: string = ''

    _onInputChange(e: Event)
    {
        this._text = (e.target as any).value;
    }

    render(){
        return html`
            <h1>Home</h1>
            <!-- <input value="${this._text}" @change="${this._onInputChange}" type="text">
            <h1>my-app</h1>
            <div>${this._text}</div> -->
        `
    }
}


