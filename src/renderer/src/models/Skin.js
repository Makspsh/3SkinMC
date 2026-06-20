export class Skin {
    constructor(width = 64, height = 64) {
        this.width = width
        this.height = height

        // 64 × 64 × 4 канала
        this.data = new Uint8ClampedArray(
            width * height * 4
        )
    }

    getIndex(x, y) {
        return (y * this.width + x) * 4
    }

    isValidPixel(x, y) {
        return (
            x >= 0 &&
            x < this.width &&
            y >= 0 &&
            y < this.height
        )
    }

    setPixel(x, y, color) {
        if (!this.isValidPixel(x, y))
            return
        const i = this.getIndex(x, y)

        this.data[i] = color.r
        this.data[i + 1] = color.g
        this.data[i + 2] = color.b
        this.data[i + 3] = color.a
    }

    getPixel(x, y) {
        if (!this.isValidPixel(x, y))
            return null
        const i = this.getIndex(x, y)


        return {
            r: this.data[i],
            g: this.data[i + 1],
            b: this.data[i + 2],
            a: this.data[i + 3]
        }
    }

    clear() {
        this.data.fill(0)
    }

    fill(color) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.setPixel(
                    x,
                    y,
                    color
                )
            }
        }
    }

    clone() {
        const copy = new Skin(
            this.width,
            this.height
        )
        copy.data.set(this.data)
        return copy
    }

    toImageData() {
        return new ImageData(
            new Uint8ClampedArray(
                this.data
            ),
            this.width,
            this.height
        )
    }

    fromImageData(imageData) {
        this.data.set(
            imageData.data
        )
    }

    async loadImage(src) {
        const image = new Image()
        image.src = src
        await new Promise((resolve, reject) => {
            image.onload = resolve
            image.onerror = reject
        })
        const canvas = document.createElement("canvas")
        canvas.width = 64
        canvas.height = 64
        const ctx = canvas.getContext("2d")
        ctx.drawImage(
            image,
            0,
            0
        )
        const imageData = ctx.getImageData(
            0,
            0,
            64,
            64
        )
        this.pixels.set(
            imageData.data
        )
    }
}