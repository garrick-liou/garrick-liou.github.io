//Code to listen for the primary harmonic from the microphone input is taken online from https://editor.p5js.org/talkscheap/sketches/ryiB52zP-, by talkscheap
//p5.collide2D library added as well.

var source, fft, lowPass;

// center clip nullifies samples below a clip amount
var doCenterClip = true;
var centerClipThreshold = 20.0;

// normalize pre / post autocorrelation
var preNormalize = true;
var postNormalize = true;

function preload() {
}

function setup() {
    micActive = true;
    createCanvas(800, 800);
    background(0, 0, 0, 255);

    platformSystem = new PlatformSystem();
    ballSystem = new ballSystem(platformSystem);
    newBall = new Ball(20, 20);
    ballSystem.addBall(newBall);
    pointSystem = new pointSystem(ballSystem);

    source = new p5.AudioIn();
    source.start();

    lowPass = new p5.LowPass();
    lowPass.disconnect();
    source.connect(lowPass);

    fft = new p5.FFT();
    fft.setInput(lowPass);

    amp = new p5.Amplitude();
    amp.setInput(source);
}

function draw() {
    var timeDomain = fft.waveform(1024, 'float32');
    var corrBuff = autoCorrelate(timeDomain);

    var freq = findFrequency(corrBuff);
    if (amp.getLevel() > 0.009) {
        if (micActive == true) {
            platformSystem.addPoint(freq);
        }
    }
    clear();
    background(0);
    platformSystem.draw();
    pointSystem.draw();
    ballSystem.draw();
}

function keyPressed() {
    if (keyCode === 32) {
        ballSystem.micActive = !ballSystem.micActive;
        platformSystem.micActive = !platformSystem.micActive;
        micActive = !micActive;
        if (micActive) {
            document.getElementById("inst").innerHTML = "Use the mic to create platforms and collect the squares for points.\nPress Spacebar to unpause the game and freeze the platforms.";
        } else {
            document.getElementById("inst").innerHTML = "Collect the squares, and get points. The smaller the square, the more points!\nPress Spacebar to pause the game and use the mic to create new platforms.";
        }
    }
}

function autoCorrelate(timeDomainBuffer) {

    var nSamples = timeDomainBuffer.length;

    // pre-normalize the input buffer
    if (preNormalize) {
        timeDomainBuffer = normalize(timeDomainBuffer);
    }

    // zero out any values below the centerClipThreshold
    if (doCenterClip) {
        timeDomainBuffer = centerClip(timeDomainBuffer);
    }

    var autoCorrBuffer = [];
    for (var lag = 0; lag < nSamples; lag++) {
        var sum = 0;
        for (var index = 0; index < nSamples - lag; index++) {
            var indexLagged = index + lag;
            var sound1 = timeDomainBuffer[index];
            var sound2 = timeDomainBuffer[indexLagged];
            var product = sound1 * sound2;
            sum += product;
        }

        // average to a value between -1 and 1
        autoCorrBuffer[lag] = sum / nSamples;
    }

    // normalize the output buffer
    if (postNormalize) {
        autoCorrBuffer = normalize(autoCorrBuffer);
    }

    return autoCorrBuffer;
}


// Find the biggest value in a buffer, set that value to 1.0,
// and scale every other value by the same amount.
function normalize(buffer) {
    var biggestVal = 0;
    var nSamples = buffer.length;
    for (var index = 0; index < nSamples; index++) {
        if (abs(buffer[index]) > biggestVal) {
            biggestVal = abs(buffer[index]);
        }
    }
    for (var index = 0; index < nSamples; index++) {

        // divide each sample of the buffer by the biggest val
        buffer[index] /= biggestVal;
    }
    return buffer;
}

// Accepts a buffer of samples, and sets any samples whose
// amplitude is below the centerClipThreshold to zero.
// This factors them out of the autocorrelation.
function centerClip(buffer) {
    var nSamples = buffer.length;

    // center clip removes any samples whose abs is less than centerClipThreshold
    centerClipThreshold = map(mouseY, 0, height, 0, 1);

    if (centerClipThreshold > 0.0) {
        for (var i = 0; i < nSamples; i++) {
            var val = buffer[i];
            buffer[i] = (Math.abs(val) > centerClipThreshold) ? val : 0;
        }
    }
    return buffer;
}

// Calculate the fundamental frequency of a buffer
// by finding the peaks, and counting the distance
// between peaks in samples, and converting that
// number of samples to a frequency value.
function findFrequency(autocorr) {

    var nSamples = autocorr.length;
    var valOfLargestPeakSoFar = 0;
    var indexOfLargestPeakSoFar = -1;

    for (var index = 1; index < nSamples; index++) {
        var valL = autocorr[index - 1];
        var valC = autocorr[index];
        var valR = autocorr[index + 1];

        var bIsPeak = ((valL < valC) && (valR < valC));
        if (bIsPeak) {
            if (valC > valOfLargestPeakSoFar) {
                valOfLargestPeakSoFar = valC;
                indexOfLargestPeakSoFar = index;
            }
        }
    }

    var distanceToNextLargestPeak = indexOfLargestPeakSoFar - 0;

    // convert sample count to frequency
    var fundamentalFrequency = sampleRate() / distanceToNextLargestPeak;
    return fundamentalFrequency;
}