/**
 * Adds bands at the top and bottom of an image using the border colors
 * @param imageUrl URL of the original image
 * @param bandSize Size of the bands in percentage (1-50)
 * @returns Promise with the URL of the new image with bands
 */
export async function addBlackBands(imageUrl: string, bandSize: number): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!imageUrl) {
      reject(new Error('No image to process'))
      return
    }

    // Limit the band size between 1% and 50%
    const safeBandSize = Math.max(1, Math.min(50, bandSize))
    
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    
    img.onload = () => {
      // Main canvas for the final image
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // Temporary canvas to get pixel data
      const tempCanvas = document.createElement('canvas')
      const tempCtx = tempCanvas.getContext('2d')
      
      if (!ctx || !tempCtx) {
        reject(new Error('Could not create canvas context'))
        return
      }
      
      // Total height is the original plus the two bands
      const bandHeight = Math.round((img.height * safeBandSize) / 100)
      canvas.width = img.width
      canvas.height = img.height + (bandHeight * 2)
      
      // Set up the temporary canvas
      tempCanvas.width = img.width
      tempCanvas.height = img.height
      tempCtx.drawImage(img, 0, 0, img.width, img.height)
      
      // Get the colors of the top and bottom edges
      const topRowData = tempCtx.getImageData(0, 0, img.width, 1).data
      const bottomRowData = tempCtx.getImageData(0, img.height - 1, img.width, 1).data
      
      // Calculate the average color of the top edge
      let rTop = 0, gTop = 0, bTop = 0
      let rBottom = 0, gBottom = 0, bBottom = 0
      
      for (let x = 0; x < img.width; x++) {
        const i = x * 4
        
        // Add up the colors of the top edge
        rTop += topRowData[i]
        gTop += topRowData[i + 1]
        bTop += topRowData[i + 2]
        
        // Add up the colors of the bottom edge
        rBottom += bottomRowData[i]
        gBottom += bottomRowData[i + 1]
        bBottom += bottomRowData[i + 2]
      }
      
      // Calculate the average
      const pixelCount = img.width
      const topColor = `rgb(${Math.round(rTop / pixelCount)}, ${Math.round(gTop / pixelCount)}, ${Math.round(bTop / pixelCount)})`
      const bottomColor = `rgb(${Math.round(rBottom / pixelCount)}, ${Math.round(gBottom / pixelCount)}, ${Math.round(bBottom / pixelCount)})`
      
      // Draw the bands with the calculated colors
      ctx.fillStyle = topColor
      ctx.fillRect(0, 0, canvas.width, bandHeight)
      
      // Draw the original image between the bands
      ctx.drawImage(img, 0, bandHeight, img.width, img.height)
      
      // Draw the bottom band
      ctx.fillStyle = bottomColor
      ctx.fillRect(0, bandHeight + img.height, canvas.width, bandHeight)
      
      // Convert the canvas to a data URL
      const newImageUrl = canvas.toDataURL('image/jpeg', 0.92)
      resolve(newImageUrl)
    }
    
    img.onerror = () => {
      reject(new Error('Error loading image'))
    }
    
    img.src = imageUrl
  })
} 