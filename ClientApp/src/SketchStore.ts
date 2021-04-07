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
        this.sketches = []; //clear array
        fetch('sketch')
            .then(response => response.json())
            .then(json => { 
                console.log(json);

                for (let i = 0; i < json.length; i++) {
                    this.sketches.push(json[i] as Sketch);
                }

                this.isLoading = false
                console.log('Loaded ' + json.length + ' sketches from the server');
            });
    }
}