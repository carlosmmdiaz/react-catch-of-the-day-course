import React from 'react';
import Header from './Header' 
import Order from './Order'
import Inventory from './Inventory'
import samplesFishes from './../sample-fishes';
import Fish from './Fish'

export class App extends React.Component {
    
    state = {
        fishes: {},
        order: {}
    };

    addFish = (fish) => {
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish;
        this.setState({fishes: fishes});
    }

    loadSamplesFishes = () => {
        this.setState({fishes: samplesFishes});
    }

    addToOrder = (key) => {
        const order = {...this.state.order};
        order[key] = order[key] + 1 || 1;
        this.setState({order: order});
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh seafood market"/>
                    <ul className="fishes">
                        {
                            Object.keys(this.state.fishes).map(key => 
                                <Fish key={key} 
                                      index={key}
                                      details={this.state.fishes[key]}
                                      addToOrder={this.addToOrder}
                                      />
                        )}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order}/>
                <Inventory addFish={this.addFish} 
                           loadSamplesFishes={this.loadSamplesFishes}/>
            </div>
        );
    }
}