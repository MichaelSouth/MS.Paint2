import React, { Component } from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export class Sketch extends Component {
    static displayName = Sketch.name;

    lastXPos = -1;
    lastYPos = -1;

    constructor(props) {
        super(props);
        this.state = { open: false };
    }
   
    componentDidMount() {
        this.fitToContainer();
        this.clearScreen();
        var colorPicker = document.getElementById("colorPicker");
        colorPicker.defaultValue = "#FFFF00";

        var brushThickness = document.getElementById("brushThickness");
        brushThickness.defaultValue = "10";
    }

    fitToContainer() {
        const canvas = document.getElementById('CanvasIdentifier');
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
            const canvas = document.getElementById('CanvasIdentifier');
            const ctx = canvas.getContext('2d');
            const rect = canvas.getBoundingClientRect();

            var brushThickness = document.getElementById("brushThickness");

            if (this.lastXPos !== -1) {
                // Shadow
                ctx.shadowColor = 'red';
                ctx.shadowBlur = 15;

                //Draw line
                var colorPicker = document.getElementById("colorPicker");
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
        const canvas = document.getElementById('CanvasIdentifier');
        const ctx = canvas.getContext('2d');
        var brushThickness = document.getElementById("brushThickness");

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

    async save() {
        //sketchDiv.classList.add('blurAnimation');

        console.log("Saving image");

        const canvas = document.getElementById('CanvasIdentifier');

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
            this.props.sketchStore.loadSketches();
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
