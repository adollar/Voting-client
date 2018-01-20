import React, {Component} from 'react'
import {Link} from "react-router-dom";

export class Navigator extends Component {
    render() {
        return (
            <ul>
                <li><Link to='/voting'>Voting</Link></li>
                <li><Link to='/results'>Results</Link></li>
            </ul>
        )
    }
}