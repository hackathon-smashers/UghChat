import {RIFFWAVE} from "./riffwave.js"

export default class AnimaleseConverter {
    private static instance: AnimaleseConverter;
    private static LETTERS_WAV = "./animalese.wav";
    private soundLib: any;

    private constructor(soundLib:any) {
        this.soundLib = soundLib
    }

    public static getInstance(): Promise<AnimaleseConverter> {
        if (!AnimaleseConverter.instance) {
            // Load wav file
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', AnimaleseConverter.LETTERS_WAV);
                xhr.responseType = 'arraybuffer'
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        // resolve(xhr.response);
                        let soundLib = new Uint8Array(this.response);
                        AnimaleseConverter.instance = new AnimaleseConverter(soundLib);
                        resolve(AnimaleseConverter.instance)
                    } else {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    }
                };
                xhr.send();
            });
        }
        return new Promise((resolve, reject) => {
            resolve(AnimaleseConverter.instance)
        })
    }

    ConvertToAnimalese (text:string, shorten:boolean, pitch:number) {
        function shortenWord(str:string) {
          if (str.length > 1) {
            return str[0] + str[str.length - 1];
          }
          return str;
        }
    
        var processed_script = text;
        if (shorten) {
          processed_script =
          text.replace(/[^a-z]/gi, ' ').split(' ').map(shortenWord).join('');
        }
    
        var data = [];
    
        var sample_freq = 44100;
        var library_letter_secs = 0.15;
        var library_samples_per_letter =
            Math.floor(library_letter_secs * sample_freq);
        var output_letter_secs = 0.075;
        var output_samples_per_letter =
            Math.floor(output_letter_secs * sample_freq);
    
        for (var c_index = 0; c_index < processed_script.length; c_index++) {
          var c = processed_script.toUpperCase()[c_index];
          if (c >= 'A' && c <= 'Z') {
            var library_letter_start =
                library_samples_per_letter * (c.charCodeAt(0) - 'A'.charCodeAt(0));
    
            for (var i = 0; i < output_samples_per_letter; i++) {
              data[c_index * output_samples_per_letter + i] =
                  this.soundLib[44 + library_letter_start + Math.floor(i * pitch)];
            }
          } else { // non pronouncable character or space
            for (var i = 0; i < output_samples_per_letter; i++) {
              data[c_index * output_samples_per_letter + i] = 127;
            }
          }
        }
    
        var wave = new RIFFWAVE();
        wave.header.sampleRate = sample_freq;
        wave.header.numChannels = 1;
        wave.Make(data);
    
        return wave;
      }
}