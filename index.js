import { useEffect, useState } from 'react'
import styles from './styles/default.module.css'

const ImageCard = props => {
  const [imageUrl, setImageUrl] = useState('')
  useEffect(() => {
    setImageUrl(props.src)
  }, [props.src])
  return (
    <>
      <div id={'Image' + props.index} className={styles.campaign-card-image-card}>
        <img src={imageUrl} alt={'Image' + props.index} className={styles.campaign-card-image} />
        <div className={styles.card-btn-container}>
          <button
            type="button"
            className={styles.campaign-card-image-button-del}
            onClick={() => props.onImageRemove(props.index)}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  )
}

const ImagesUploader = props => {
  const onImageUpload = () => {
    let file = document.createElement('input')
    file.type = 'file'
    file.multiple = true
    file.onchange = loadFile
    file.click()
  }

  const onImageRemove = index => {
    let _newlist = props.imageList.filter(_image => {
      return _image.id !== index
    })
    props.onchange(_newlist)
  }

  const loadFile = event => {
    let _newImages = props.imageList
    for (let index = 0; index < event.target.files.length; index++) {
      const element = event.target.files[index]
      let image = document.createElement('img')
      image.id = 'image' + index
      image.className = '{styles.campaign-card-image}'
      image.src = URL.createObjectURL(element)
      //imgsContainer.appendChild(image)
      let reader = new FileReader()
      reader.readAsDataURL(element)

      reader.onloadend = () => {
        // Use a regex to remove data url part
        let _newImage = {
          id: _newImages.length,
          blob_file: reader.result.replace('data:', '').replace(/^.+,/, ''),
          filename: '',
          url: URL.createObjectURL(element),
        }
        _newImages.push(_newImage)
        props.onchange(_newImages)
      }

      image.onload = function () {
        URL.revokeObjectURL(image.src) // free memory
      }
    }
  }

  useEffect(() => {
    
  }, [props.imageList])

  return (
    <>
      <div className={styles.campaign-images-btn-wrapper}>
        <div className={styles.campaign-images-wrapper}>
          {props.imageList.map((image, index) => (
            <ImageCard key={index} src={image.url} index={image.id} onImageRemove={onImageRemove}></ImageCard>
          ))}
        </div>
        <div className={styles.campaign-btn-wrapper}>
          <button onClick={onImageUpload} className={styles.campaign-card-add-images} type="button">
            Add Images
          </button>
        </div>
      </div>
    </>
  )
}

export default ImagesUploader