import React from 'react';
import { getFunName } from './../helpers';

export class StorePicker extends React.Component {
    myInput = React.createRef();

    goToStore = (event) => {
        event.preventDefault();
        const storename = this.myInput.current.value;
        this.props.history.push(`/store/${storename}`);
    }
    render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter A Store</h2>
                <input type="text" 
                       required 
                       ref={this.myInput}
                       placeholder="Store Name" 
                       defaultValue={getFunName()}/>
                <button type="submit">Visit Store -></button>
            </form>
        );
    }
}