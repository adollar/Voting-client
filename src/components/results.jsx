import React, {PureComponent} from 'react'

export class Results extends PureComponent
{
    getPair() {
        return this.props.pair || []
    }

    getVotes(entry) {
        if (this.props.tally && this.props.tally.has(entry)) {
            return this.props.tally.get(entry);
        }

        return 0;
    }

    render() {
        return (
            <div className="results">
                <div className="tally">
                    {this.getPair().map((entry) => (
                        <div key={entry} className="entry">
                            <h1>{entry}</h1>
                            <div>{this.getVotes(entry)}</div>
                        </div>
                    ))}
                </div>
                <div className="management">
                    <button ref="next" onClick={this.props.next}>
                        Next
                    </button>
                </div>
            </div>
        )
    }
}