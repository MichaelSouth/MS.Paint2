import React, { Component } from 'react';
import { observer } from 'mobx-react' // 6.x or mobx-react-lite@1.4.0

class Gallery extends Component {
    static displayName = Gallery.name;

    render() {
        var divStyle = {
            borderRadius: "5%"
        };
        const sortedSketches = this.props.sketchStore.sketches.slice().sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        return (
            <table >
                <tbody>
                    {  sortedSketches.map(sketch => 
                        <tr key={sketch.name}>
                            <td> <img style={divStyle} class="bg-image" src={`data:image/png;base64,${sketch.imageData}`} width="320" height="256" alt={sketch.name} /></td>
                        </tr>
                    )};
                </tbody>
            </table>
        );
    }
}

export default observer(Gallery);
