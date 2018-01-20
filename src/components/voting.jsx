import React, {PureComponent} from 'react'
import {Vote} from "./vote";
import {Winner} from "./winner";

export class Voting extends PureComponent {
    render() {
        return (
            <div>
                {this.props.winner ?
                    <Winner ref="winner" winner={this.props.winner}/> :
                    <Vote {...this.props} />}
            </div>
        )
    }
}