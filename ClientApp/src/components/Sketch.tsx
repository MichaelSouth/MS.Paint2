import React, { Component } from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export class Sketch extends Component {
    static displayName : string = Sketch.name;

    lastXPos : number = -1;
    lastYPos : number= -1;

    constructor(props : any) {
        super(props);
        this.state = { open: false };
    }
   
    componentDidMount() {
        this.fitToContainer();
        this.clearScreen();
        var colorPicker = document.getElementById("colorPicker") as HTMLInputElement;
        colorPicker.defaultValue = "#FFFF00";

        var brushThickness = document.getElementById("brushThickness") as HTMLInputElement;
        brushThickness.defaultValue = "10";
    }

    fitToContainer() {
        const canvas = document.getElementById('CanvasIdentifier') as HTMLCanvasElement;
        // Make it visually fill the positioned parent
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        // ...then set the internal size to match
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    // https://www.npmjs.com/package/trianglify
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

    onMouseUp(e) {
        this.lastXPos = -1;
        this.lastYPos = -1;
    }

    onMouseMove(e) {
        let leftMouseButtonOnlyDown = e.buttons === undefined
            ? e.which === 1
            : e.buttons === 1;

        if (leftMouseButtonOnlyDown) {
            const canvas = document.getElementById('CanvasIdentifier') as HTMLCanvasElement;
            const ctx = canvas.getContext('2d');
            const rect = canvas.getBoundingClientRect();

            var brushThickness = document.getElementById("brushThickness") as HTMLInputElement;

            if (this.lastXPos !== -1) {
                // Shadow
                ctx.shadowColor = 'red';
                ctx.shadowBlur = 15;

                //Draw line
                var colorPicker = document.getElementById("colorPicker") as HTMLInputElement;
                ctx.strokeStyle = colorPicker.value;
                ctx.fillStyle = colorPicker.value;
                ctx.lineWidth = brushThickness.value;

                // Reset the current path
                ctx.beginPath();
                // Staring point
                ctx.moveTo(this.lastXPos, this.lastYPos);
                // End point 
                ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
                // Make the line visible
                ctx.stroke();
            }

            this.lastXPos = e.clientX - rect.left;
            this.lastYPos = e.clientY - rect.top;
        }
    }

    clearScreen() {
        const canvas = document.getElementById('CanvasIdentifier') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        var brushThickness = document.getElementById("brushThickness") as HTMLInputElement;

        console.log("Clear!"); 

        //Clear screen
        ctx.fillStyle = "#222222";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Shadow
        ctx.shadowColor = 'red';
        ctx.shadowBlur = 15;

        //Draw Text
        ctx.fillStyle = "#FFFFFF";
        //ctx.globalAlpha = alpha;
        ctx.font = '24pt Arial';
        ctx.font = '75pt Arial';
        const text = "Draw On Me!";
        let len = ctx.measureText(text);
        ctx.fillText(text, canvas.width / 2 - (len.width / 2), canvas.height / 2);
    }

    async deleteAllSketches() {
        console.log("Delete all sketches");

        const response = await fetch('sketch/DeleteAll', {
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
        }).then(response => {
            this.props.sketchStore.refreshSketches();
        });   

    }

    goWild() {
        console.log("Go Wild");
        const canvas = document.getElementById('CanvasIdentifier') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        for (let i: number = 0; i < 300; i++) {
            //Draw random line
            ctx.shadowColor = this.getRandomColor();
            ctx.shadowBlur = 15;
            ctx.fillStyle = this.getRandomColor();
            ctx.strokeStyle = this.getRandomColor();
            ctx.lineWidth = 30;

            const x1: number = Math.floor(Math.random() * canvas.width);
            const y1: number = Math.floor(Math.random() * canvas.height);
            const x2: number = Math.floor(Math.random() * canvas.width);
            const y2: number = Math.floor(Math.random() * canvas.height);
            
            ctx.beginPath(); // Reset the current path         
            ctx.moveTo(x1, y1);  // Staring point         
            ctx.lineTo(x2, y2); // End point       
            ctx.stroke();    // Redner the line visible
        }
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    async save() {
        //sketchDiv.classList.add('blurAnimation');

        console.log("Saving image");

        const canvas = document.getElementById('CanvasIdentifier') as HTMLCanvasElement;

        var sketchModel = {
            Name: this.GenerateIdentifier(),
            ImageData: canvas.toDataURL()
        };

        const response = await fetch('sketch', {
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(sketchModel)
        }).then(response => {
            this.props.sketchStore.refreshSketches();
        });   
    }

     GenerateIdentifier() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    
    render() {
        //Hack remove and put style in .css file
        var divStyle = {
            borderRadius: "2%"
        };

        return (
            <Layout>
                <Layout>
                    <Content>
                        <canvas ref="canvas"
                            id="CanvasIdentifier"
                            style={divStyle}
                            width="800"
                            height="600"
                            onMouseUp={(e) => { this.onMouseUp(e) }} 
                            onMouseMove={(e) => { this.onMouseMove(e) }} >
                        </canvas>   
                     </Content>
                </Layout>
                <Footer>
                    <button
                    type="button"
                    onClick={(e) => { this.clearScreen() }}
                    className="btn btn-primary mr-1">Clear Screen</button>

                    <button
                        type="button"
                        onClick={(e) => { this.save() }}
                        className="btn btn-primary mr-1">Save</button>

                    <button
                        type="button"
                        onClick={(e) => { this.goWild() }}
                        className="btn btn-primary mr-1">Go Wild</button>

                    <button
                        type="button"
                        onClick={(e) => { this.deleteAllSketches()}}
                        className="btn btn-primary mr-1">Delete All Sketches</button>

                    <input id="colorPicker"
                        type="color" />

                    <input id="brushThickness"
                        type="range"
                        min="0"
                        max="100"
                        step="1" />
                </Footer>
            </Layout>
        );
    }
}
