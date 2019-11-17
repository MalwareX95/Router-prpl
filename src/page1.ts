import {html, LitElement, customElement, property} from 'lit-element'

@customElement('page1-component')
class PageComponent extends LitElement{
    @property({type: String})
    _text: string = ''

    _onInputChange(e: Event)
    {
        this._text = (e.target as any).value;
    }

    render(){
        return html`
            <h1>Page1</h1>
            <!-- <input value="${this._text}" @change="${this._onInputChange}" type="text">
            <h1>bar</h1>
            <div>${this._text}</div>
            <child-1></child-1> -->
        `
    }
}
