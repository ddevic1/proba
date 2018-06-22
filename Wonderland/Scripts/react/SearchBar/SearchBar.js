import React, { Component } from 'react';

var CategoryRow = React.createClass({
    render: function () {
        return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
});

var ResultRow = React.createClass({
    render: function () {
        var name = this.props.item.stocked ?
            this.props.item.name :
            <span style={{ color: 'red' }}>
                {this.props.item.name}
            </span>;
        var image = null;
        if (this.props.item.category === "Location")
            image = "https://cdn2.iconfinder.com/data/icons/national-and-politican-pointers-of-countries/154/country-pointer-geo-location-japan-512.png";
        else {
            image = "https://stevex.sk/wp-content/uploads/2016/03/Graphicloads-100-Flat-Contact.png";
        }
        return (
            <tr>

                <td> <img id="image" src={image} /> {name}  </td>
            </tr>
        );
    }
});

var ProductTable = React.createClass({
    render: function () {
        var rows = [];
        var lastCategory = null;
        //console.log({ "items": this.props.items })
        this.props.items.forEach(function (item) {
            if (item.name.indexOf(this.props.filterText) === -1 ) {
                return;
            }
            if (item.category !== lastCategory) {
                rows.push(<CategoryRow category={item.category} key={item.category} />);
            }
            rows.push(<ResultRow item={item} key={item.name} />);
            lastCategory = item.category;
        }.bind(this));
        return (
            <table id="SearchBarTable">
              {rows}
            </table>
        );
    }
});

var SearchBar = React.createClass({
    handleChange: function () {
        this.props.onUserInput(
            this.refs.filterTextInput.value
        );
    },
    render: function () {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    id="filterTextInput"
                    onChange={this.handleChange}
                />
            
            </form>
        );
    }
});

var FilterableProductTable = React.createClass({
    getInitialState: function () {
        return {
            filterText: '',
            x:[]
        };
    },

    handleUserInput: function (filterText) {
        if (filterText.length > 0) {
            this.setState({
                filterText: filterText,
                x: this.props.items
            });
        }
        else {
            this.setState({
                filterText: filterText,
                x: []
            });
        }
    },

    render: function () {
        return (
            <div id="divmove">
                <SearchBar
                    filterText={this.state.filterText}
                    onUserInput={this.handleUserInput}
                />
                <div id="pokusaj">
                </div>
                <ProductTable
                    items={this.state.x}
                    filterText={this.state.filterText}
                />
            </div>
        );
    }
});



export default FilterableProductTable;

