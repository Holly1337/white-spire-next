const withImages = require('next-images')
const withSass = require('@zeit/next-sass')
const withFonts = require('next-fonts')
module.exports = withImages(withFonts(withSass()))
