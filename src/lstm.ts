import * as tf from "@tensorflow/tfjs-node";
import * as fs from 'fs';
import {TextData} from './text-data'

const CHAR_SET_SIZE = 85;
const LSTM_LAYER_SIZE = 32;
const SAMPLE_LENGTH = 512;
const SAMPLE_STEP = SAMPLE_LENGTH;
const NUM_EPOCS = 1;
const NUM_ERA  = 1;
const BATCH_SIZE = 512 ;
const LENGTH = 512;
const TEMPERATURE = 0.05;
const EXAMPLES_PER_EPOC = 10

const corpus = fs.readFileSync('./corpus/hacker-howto.txt','utf8');

const TEXT_DATA = (new TextData(
    "test",
    corpus,
    SAMPLE_LENGTH,
    SAMPLE_STEP
)) ;


// Avoid overwriting the original input.




// const encodeDataSet = (
//     chars:string[],
//     charSetSize = CHAR_SET_SIZE
// ) => tf.oneHot(
//     tf.tensor1d(
//         chars.map(c => c.charCodeAt(0)),
//         'int32'
//     ),
//     charSetSize
// );



export function create() {
    const model = tf.sequential();
    const lstm1 = tf.layers.lstm({
        units: LSTM_LAYER_SIZE,
        inputShape:  [SAMPLE_LENGTH, CHAR_SET_SIZE] ,
        returnSequences: true,
    });

    const lstm2 = tf.layers.lstm({
        units: LSTM_LAYER_SIZE,
        returnSequences: false,
    });

    model.add(lstm1);
    model.add(lstm2);

    model.add(tf.layers.dense({
        units: CHAR_SET_SIZE, activation: 'softmax'
    }));

    const optimizer = tf.train.rmsprop(0.05);
    model.compile({optimizer: optimizer, loss: 'categoricalCrossentropy'});
    return model
}

export async function fit(model:tf.Model, {
    epochs = NUM_ERA,
    batchSize = BATCH_SIZE,
    examplesPerEpoch = EXAMPLES_PER_EPOC,
    data = TEXT_DATA
} ) {
    for (let i = 0; i < NUM_EPOCS; ++i) {
        const [xs, ys] = data.nextDataEpoch(examplesPerEpoch);
        await model.fit(xs, ys, {epochs , batchSize});
        xs.dispose();
        ys.dispose();
    }
}

export function generate(model:tf.Sequential,textData):string {

    let [ seedSentence, seedSentenceIndices ] = textData.getRandomSlice();
    let sentenceIndices = seedSentenceIndices;

    sentenceIndices = sentenceIndices.slice();
    let generated = seedSentence || '';
    while (generated.length < LENGTH) {
        // Encode the current input sequence as a one-hot Tensor.
        const inputBuffer = tf.buffer([1, SAMPLE_LENGTH, CHAR_SET_SIZE]);

        // Make the one-hot encoding of the seeding sentence.
        for (let i = 0; i < SAMPLE_LENGTH; ++i) {
            inputBuffer.set(i, 1, sentenceIndices[i]);
        }
        const input = inputBuffer.toTensor();

        // Call model.predict() to get the probability values of the next
        // character.
        const output = <tf.Tensor<tf.Rank>>model.predict(input);

        // Sample randomly based on the probability values.
        const winnerIndex = sample(tf.squeeze(output), TEMPERATURE);
        const winnerChar = textData.getFromCharSet(winnerIndex);

        generated += winnerChar;
        sentenceIndices = sentenceIndices.slice(1);
        sentenceIndices.push(winnerIndex);


        // Memory cleanups.
        input.dispose();
        output.dispose();
    }
    return generated;
}


function sample(probs:tf.Tensor, temperature:number) {
    return tf.tidy(() => {
        const logits = <tf.Tensor1D>tf.div(tf.log(probs), Math.max(temperature, 1e-6));
        const isNormalized = false;
        // `logits` is for a multinomial distribution, scaled by the temperature.
        // We randomly draw a sample from the distribution.
        return tf.multinomial(logits, 1, null, isNormalized).dataSync()[0];
    });
}
