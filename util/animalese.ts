class AnimaleseConverter {
    private static LETTERS_WAV = "./animalese.wav";
    private soundLib: any;

    private constructor(soundLib:any) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', AnimaleseConverter.LETTERS_WAV);
        xhr.responseType = 'arraybuffer'
        let converter = this
        xhr.onload = function () {
            converter.soundLib = (xhr.response);
            let soundLib = new Uint8Array(this.response);
            AnimaleseConverter.instance = new AnimaleseConverter(soundLib);
        };
        xhr.send();
        this.soundLib = soundLib
    }

    public static getInstance(): AnimaleseConverter {
        if (!AnimaleseConverter.instance) {
            // Load wav file
            return new Promise<AnimaleseConverter>(function (resolve, reject) {
                
            });
        }

        return AnimaleseConverter.instance;
    }
}