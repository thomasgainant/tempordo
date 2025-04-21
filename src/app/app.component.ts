import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
//import * as brain from 'brain.js';
import { INumberHash } from 'brain.js/dist/lookup';

export interface NeuralNetworkInput extends Partial<INumberHash>{
  title:number;
}

export interface NeuralNetworkOutput extends Partial<INumberHash>{
  category:TaskCategory;
  priority:number;
}

export enum TaskCategory{
  Personal,
  Work
}

export function asciiConcatToNumber(input: string): number {
  const asciiString = Array.from(input)
    .map(char => char.charCodeAt(0).toString())
    .join('');
  return Number(asciiString)/127.0;
}

const inputs:NeuralNetworkInput[] = [
  { title: asciiConcatToNumber("anniversaire") },
  { title: asciiConcatToNumber("courses") },
  { title: asciiConcatToNumber("mariage") },
  { title: asciiConcatToNumber("facture") },
  { title: asciiConcatToNumber("impots") },

  { title: asciiConcatToNumber("reunion") },
  { title: asciiConcatToNumber("deadline") }
];

const outputs:NeuralNetworkOutput[] = [
  { category: TaskCategory.Personal, priority: 5 },
  { category: TaskCategory.Personal, priority: 2 },
  { category: TaskCategory.Personal, priority: 7 },
  { category: TaskCategory.Personal, priority: 3 },
  { category: TaskCategory.Personal, priority: 5 },

  { category: TaskCategory.Work, priority: 2 },
  { category: TaskCategory.Work, priority: 5 }
];

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private neuralNetConfig = {
    binaryThresh: 0.5,
    hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
  };

  // create a simple feed-forward neural network with backpropagation
  //private neuralNet:brain.NeuralNetwork<NeuralNetworkInput, NeuralNetworkOutput> | undefined = undefined;

  constructor() {
    console.log(inputs);
    console.log(outputs);

    /*if(!this.neuralNet){
      this.neuralNet = new brain.NeuralNetwork<NeuralNetworkInput, NeuralNetworkOutput>(this.neuralNetConfig);

      this.neuralNet.train(inputs.map((value, index) => {
        return { input: value, output: outputs[index] }
      }));
    }

    let input = {
      title: asciiConcatToNumber("Faire les courses")
    };
    console.log(input);
    let output = this.neuralNet.run(input);
    console.log(output);

    input = {
      title: asciiConcatToNumber("Anniversaire de mariage")
    };
    console.log(input);
    output = this.neuralNet.run(input);
    console.log(output);

    input = {
      title: asciiConcatToNumber("Payer facture EDF")
    };
    console.log(input);
    output = this.neuralNet.run(input);
    console.log(output);

    input = {
      title: asciiConcatToNumber("Déclarer impots")
    };
    console.log(input);
    output = this.neuralNet.run(input);
    console.log(output);

    input = {
      title: asciiConcatToNumber("Réunion fin de trimestre")
    };
    console.log(input);
    output = this.neuralNet.run(input);
    console.log(output);*/
  }
}
