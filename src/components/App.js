import React, { Component } from 'react';

import FruitBasket from './FruitBasket';

class App extends Component {
  constructor() {
    super();

    this.state = {
      filters: [],
      currentFilter: null,
      fruit: []
    };
  }

  handleFilterChange = event => {
    console.log('new filter: ', event.target.value);
    this.setState({ currentFilter: event.target.value });
  }

  componentDidMount() {
    fetch('/api/fruit')
      .then(response => response.json())
      .then(fruit => this.setState({ fruit }));
  }

  componentWillMount() {
    this.fetchFilters();
  }

  fetchFilters = () => {
    fetch('/api/fruit_types')
      .then(response => response.json())
      .then(filters => this.setState({ filters }));
  }

	

  render() {
  	const fruit = !this.state.currentFilter || this.state.currentFilter === 'all' ? this.state.fruit : this.state.fruit.filter(i => i.fruit_type === this.state.currentFilter);

    return (
      <FruitBasket filters={this.state.filters} currentFilter={this.state.currentFilter} handleChange={this.handleFilterChange} fruit={fruit} />	
    );
  }
}

export default App;
