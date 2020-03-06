import React, { Component } from 'react';
import CurrencyFormat from 'react-currency-format';

class ListComponent extends Component {
    state = {
        communities: [],
        home: [],
        loaded: true,
    }

    componentDidMount() {

        fetch('https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/communities')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    communities: json
                })
                fetch('https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/homes')
                    .then(res => res.json())
                    .then(json => {
                        this.setState({
                            home: json,
                            loaded: false
                        })
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }).catch(function (error) {
                console.log(error);
            })
    }

    GetAverage() {
        for (let i = 0; i < this.state.communities.length; i++) {
            let price = 0.00;
            let counter = 0;
            let addPrice = { ...this.state.communities }

            for (let j = 0; j < this.state.home.length; j++) {
                if (this.state.communities[i].id == this.state.home[j].communityId) {
                    price = price + this.state.home[j].price;
                    counter++
                }
            }
            price = price / counter;
            price = price.toFixed(2);
            if (isNaN(price)) {
                price = 0.00;
            }
            addPrice[i].price = price;
        }

    }

    render() {
        let { loaded, communities } = this.state;

        if (loaded) {
            return <div>loading...</div>
        }
        else {
            this.GetAverage()
            return (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>name</th>
                                <th>Group</th>
                                <th>Average Price</th>
                            </tr>
                            {communities.sort((a, b) => a.group.localeCompare(b.group))
                                .map(item => (
                                    <tr key={item.id} >
                                        <td>
                                            <img alt="" src={item.imgUrl == "" ? '' : item.imgUrl} />
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>

                                        <td>
                                            {item.group}
                                        </td>
                                        <td>
                                            {item.price == 0 ? 'Average not available' : <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />}

                                        </td>
                                    </tr>
                                ))}
                        </thead>
                    </table>
                </div>
            );
        }

    }
}

export default ListComponent;
