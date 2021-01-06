import hexToHsl from 'hex-to-hsl';
import hslToHex from '@sateeshnpm/hsl-to-hex';

class TempToColorConverterService {
    static _max = {
        temp: 30,
        color: "#ff8c00"
    }
    static _inter = {
        temp: 10,
        color: "#fff700"
    }
    static _min = {
        temp: -10,
        color: "#00ffff"
    }

    static _getDecColorPercentage(max, min, current) {
        return (current - min) / (max - min);
    }
    //_inter //_max
    static _calculateHexColor(start, end, temp) {
        var length = hexToHsl(start.color)[0] - hexToHsl(end.color)[0];
        var percentage = this._getDecColorPercentage(end.temp, start.temp, temp);
        var hue = hexToHsl(start.color)[0] - (length * percentage);
        return hslToHex(hue, 100, 50);
    }

    static getColor(temp) {
        if (temp >= this._max.temp) {
            return this._max.color;
        }

        if (temp >= this._inter.temp) {
            return this._calculateHexColor(this._inter, this._max, temp);
        }

        if (temp < this._inter.temp && temp > this._min.temp) {
            return this._calculateHexColor(this._min, this._inter, temp);
        }

        if (temp <= this._min.temp) {
            return this._min.color;
        }
    }
}

export default TempToColorConverterService;