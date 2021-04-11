import * as React from 'react'
import { Component } from 'react';
import { observer } from 'mobx-react' // 6.x or mobx-react-lite@1.4.0
import { Sketch } from "../services/Sketch"
import { SketchStore } from "../services/SketchStore"

interface GalleryState {
    SketchStore: SketchStore;
}

class Gallery extends Component<GalleryState, any> {
    static displayName = Gallery.name;

    render() {
        var divStyle = {
            borderRadius: "5%"
        };
        const sortedSketches = this.props.SketchStore.sketches.slice().sort((a: Sketch, b: Sketch) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        return (
            <table >
                <tbody>
                    {sortedSketches.map((sketch: Sketch) => 
                        <tr key={sketch.name}>
                            <td> <img style={divStyle} className="bg-image" src={`data:image/png;base64,${sketch.imageData}`} width="320" height="256" alt={sketch.name} /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default observer(Gallery);
