import { makeAutoObservable} from "mobx"
import { Sketch } from "./Sketch"

export class SketchStore {
    sketches : Sketch[] = []
    isLoading = true

    constructor() {
        makeAutoObservable(this)
        this.refreshSketches()
    }

    // Fetches all sketches from the server
    async refreshSketches() {
        console.log('Fetching sketches from the server');

        this.isLoading = true

        fetch('sketch')
            .then(response => response.json())
            .then(json => {             
                // Add any new sketches
                for (let i: number = 0; i < json.length; i++) {
                    const tempSketch: Sketch = json[i] as Sketch
                    console.log(`Found: ${tempSketch.name}`);

                    //does sketch already exist (key just based on name)
                    let exist: boolean = false;

                    this.sketches.forEach(origSketch => {
                        for (let i: number = 0; i < json.length; i++) {
                            if (tempSketch.name === origSketch.name) {
                                exist = true;
                                break;
                            };
                        }
                    });

                    if (exist === false) {
                        this.sketches.push(tempSketch);
                    }
                }

                //Remove any deleted
                for (let i: number = 0; i < this.sketches.length; i++) {
                    const origSketch: Sketch = this.sketches[i];
                    let exist: boolean = false;

                    for (let j: number = 0; j < json.length; j++) {
                        const tempSketch: Sketch = json[j] as Sketch
                        if (tempSketch.name === origSketch.name) {
                            exist = true;
                            break;
                        };
                    }

                    if (exist === false) {
                        const filteredData = this.sketches.filter(item => item !== origSketch);
                        this.sketches = filteredData;
                        i = -1;
                    }
                };

                this.isLoading = false
                console.log('Loaded ' + json.length + ' sketches from the server');
            });
    }
}