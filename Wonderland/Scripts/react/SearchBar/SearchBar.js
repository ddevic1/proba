import React, { Component } from 'react';

var CategoryRow = React.createClass({
    render: function () {
        return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
});

var ResultRow = React.createClass({
    handleRowClick: function () {
        this.props.onClicked(this.props.item.name);
    },
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
            <tr onClick={this.handleRowClick}>

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
                rows.push(<CategoryRow category={item.category} key={item.category}  />);
            }
            rows.push(<ResultRow item={item} key={item.name} onClicked={this.props.onClick1} />);
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
        var wid = "100%";
        if (this.props.loc === "post")
            wid = "40%";
        console.log(this.props.loc);
        return (
            <form style={{ display: "inline" }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    id="filterTextInput"
                    onChange={this.handleChange}
                    style={{ width: wid, display: "inline" }}
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
        var items = [];
        this.props.friends1.forEach(function (friend) {
            items.push({ category: 'People', image: '"' + 'https://cdn2.iconfinder.com/data/icons/national-and-politican-pointers-of-countries/154/country-pointer-geo-location-japan-512.png' + '"', stocked: true, name: friend.Name + " " + friend.Surname })
        });
        if (filterText.length > 0) {
            this.setState({
                filterText: filterText,
                x: items
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
        console.log(this.props.friends1);
        return (
            <div id="divmove" style={{ display: "inline"}}>
                <SearchBar
                    filterText={this.state.filterText}
                    onUserInput={this.handleUserInput}
                    loc={this.props.loc}
                />
                <div id="pokusaj">
                </div>
                <ProductTable
                    items={this.state.x}
                    filterText={this.state.filterText}
                    onClick1={this.props.getClickedItem}
                />
            </div>
        );
    }
});



export default FilterableProductTable;

