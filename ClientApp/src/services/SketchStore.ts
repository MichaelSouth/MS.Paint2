import { makeAutoObservable} from "mobx"
import { Sketch } from "./Sketch"

export class SketchStore {
    sketches : Sketch[] = []
    isLoading = true

    constructor() {
        makeAutoObservable(this)
        this.loadSketches()
    }

    // Fetches all sketches from the server
    async loadSketches() {
        console.log('Fetching sketches from the server');

        this.isLoading = true

        fetch('sketch')
            .then(response => response.json())
            .then(json => {             
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
               
                this.isLoading = false
                console.log('Loaded ' + json.length + ' sketches from the server');
            });
    }
}